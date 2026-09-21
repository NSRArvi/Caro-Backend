<?php

namespace App\Http\Controllers\Api\Rider;

use App\Http\Controllers\Controller;
use App\Models\DeviceToken;
use App\Models\Order;
use App\Models\User;
use App\Models\UserRider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RiderAccountController extends Controller
{
    /**
     * Soft delete account (self-delete by authenticated user).
     *
     * The record is NOT permanently removed from the database;
     * its 'deleted_at' timestamp is populated and tokens are revoked.
     * First soft-deletes the user, and if the user is a rider, also soft-deletes user_rider records.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteAccount(Request $request): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return sendResponse(false, 'Unauthenticated.', null, 401);
        }

        return $this->performSoftDelete($user);
    }

    /**
     * Soft delete an account by ID or self (for user, rider, or admin).
     *
     * Supports:
     * - Deleting own account if $id is omitted or matches current user/rider ID
     * - Deleting by User ID ($user->id)
     * - Deleting by Rider Profile ID ($userRider->id)
     * First soft-deletes the user, and if the user is a rider, also soft-deletes user_rider records.
     *
     * @param int|string|null $id
     * @return JsonResponse
     */
    public function destroy($id = null): JsonResponse
    {
        $currentUser = Auth::user();

        if (!$currentUser) {
            return sendResponse(false, 'Unauthenticated.', null, 401);
        }

        // If no ID is passed, default to deleting own account
        if (empty($id)) {
            return $this->performSoftDelete($currentUser);
        }

        // Check if the user is deleting their own account (by user ID or by user_rider ID)
        $isSelf = ((string)$currentUser->id === (string)$id) ||
                  UserRider::where('user_id', $currentUser->id)->where('id', $id)->exists();

        if ($isSelf) {
            return $this->performSoftDelete($currentUser);
        }

        // Check if the current user is an admin
        $isAdmin = $currentUser->hasRole('admin') || $currentUser->hasRole('super-admin');

        if (!$isAdmin) {
            return sendResponse(false, 'Unauthorized. You do not have permission to delete this account.', null, 403);
        }

        // Admin deleting an account: find by user ID or user_rider ID
        $user = User::where('id', $id)
            ->orWhereHas('userRiders', function ($q) use ($id) {
                $q->where('id', $id);
            })->first();

        if (!$user) {
            $userRider = UserRider::find($id);
            if ($userRider) {
                $user = User::find($userRider->user_id);
            }
        }

        if (!$user) {
            return sendResponse(false, 'User not found.', null, 404);
        }

        return $this->performSoftDelete($user);
    }

    /**
     * Restore a soft-deleted account by ID.
     * First restores the user, and if the user is a rider, also restores user_rider records.
     *
     * @param int|string $id
     * @return JsonResponse
     */
    public function restore($id): JsonResponse
    {
        $currentUser = Auth::user();

        if (!$currentUser) {
            return sendResponse(false, 'Unauthenticated.', null, 401);
        }

        // Only admin/super-admin can restore soft-deleted accounts
        $isAdmin = $currentUser->hasRole('admin') || $currentUser->hasRole('super-admin');
        if (!$isAdmin) {
            return sendResponse(false, 'Unauthorized. Only administrators can restore accounts.', null, 403);
        }

        // Find soft-deleted user by User ID or by UserRider ID
        $user = User::onlyTrashed()->where(function ($query) use ($id) {
            $query->where('id', $id)
                  ->orWhereHas('userRiders', function ($q) use ($id) {
                      $q->withTrashed()->where('id', $id);
                  });
        })->first();

        if (!$user) {
            $userRider = UserRider::onlyTrashed()->find($id);
            if ($userRider) {
                $user = User::onlyTrashed()->find($userRider->user_id);
            }
        }

        if (!$user) {
            return sendResponse(false, 'Soft-deleted user not found.', null, 404);
        }

        try {
            DB::beginTransaction();

            $isRider = $user->hasRole('rider')
                || $user->user_type == User::$userType['rider']
                || UserRider::withTrashed()->where('user_id', $user->id)->exists();

            // 1. FIRST: Restore the user record
            $user->restore();
            $user->status = User::$status['active'];
            $user->save();

            // 2. THEN: If user is a rider, also restore user_rider records
            if ($isRider) {
                UserRider::onlyTrashed()->where('user_id', $user->id)->restore();
            }

            DB::commit();

            return sendResponse(true, 'Account restored successfully.', [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'status' => User::$statusName[$user->status] ?? 'active',
                'is_rider' => (bool)$isRider,
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            return sendResponse(false, 'Failed to restore account: ' . $exception->getMessage(), null, 500);
        }
    }

    /**
     * Helper method to safely soft delete an account without removing from the database.
     * First soft-deletes the user record, and if the user is a rider, also soft-deletes user_rider records.
     *
     * @param User $user
     * @return JsonResponse
     */
    protected function performSoftDelete(User $user): JsonResponse
    {
        // Safety check: Prevent deletion if user has active/ongoing delivery orders
        $ongoingStatuses = [
            Order::$ORDER_STATUS['confirmed'],
            Order::$ORDER_STATUS['picked'],
            Order::$ORDER_STATUS['shipping'],
        ];

        $hasActiveRiderOrders = Order::where('rider_id', $user->id)
            ->whereIn('status', $ongoingStatuses)
            ->exists();

        if ($hasActiveRiderOrders) {
            return sendResponse(
                false,
                'Cannot delete account. The rider has active or ongoing deliveries.',
                null,
                400
            );
        }

        $hasActiveCustomerOrders = Order::where('customer_id', $user->id)
            ->whereIn('status', $ongoingStatuses)
            ->exists();

        if ($hasActiveCustomerOrders) {
            return sendResponse(
                false,
                'Cannot delete account. You have active or ongoing orders.',
                null,
                400
            );
        }

        try {
            DB::beginTransaction();

            // 1. Mark status as inactive
            $user->status = User::$status['inactive'];
            $user->save();

            // 2. Revoke all Sanctum API personal access tokens
            $user->tokens()->delete();

            // 3. Remove FCM device tokens
            DeviceToken::where('user_id', $user->id)->delete();

            // Check if user is a rider or has user_rider records
            $isRider = $user->hasRole('rider')
                || $user->user_type == User::$userType['rider']
                || UserRider::where('user_id', $user->id)->exists();

            // 4. FIRST: Soft-delete the user record (sets deleted_at timestamp; does NOT remove row from MySQL)
            $user->delete();

            // 5. THEN: If he is a user_rider, also soft-delete user_rider records
            if ($isRider) {
                UserRider::where('user_id', $user->id)->delete();
            }

            DB::commit();

            return sendResponse(true, 'Account soft-deleted successfully. The account has been deactivated and retained in the database.', [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_rider' => (bool)$isRider,
                'deleted_at' => $user->deleted_at,
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            return sendResponse(false, 'Failed to soft delete account: ' . $exception->getMessage(), null, 500);
        }
    }
}
