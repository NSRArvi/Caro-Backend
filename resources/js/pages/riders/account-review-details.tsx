import AppLayout from "@/layouts/app-layout";
import { Head, usePage, Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type RiderDocument = {
    id: number;
    user_id: number;
    document_type: string;
    document_number: string;
    document: string[];
    review_status: number;
    remarks?: string | null;
    created_at: string;
    updated_at: string;
};

type Rider = {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    profile_image?: string;
    dob?: string;
    gender?: string;
    status: number;
    created_at: string;
    updated_at: string;
    review_status?: number;
    user_riders: RiderDocument[];
};

interface Props {
    rider: Rider;
    [key: string]: any;
}

const reviewStatusMap: Record<number, string> = {
    1: "Pending",
    2: "Approved",
    3: "Rejected",
};

const statusStyle: Record<number, { badge: string; dot: string }> = {
    1: { badge: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500" },
    2: { badge: "bg-green-100 text-green-800",   dot: "bg-green-600" },
    3: { badge: "bg-red-100 text-red-800",        dot: "bg-red-600"   },
};

function StatusBadge({ status }: { status: number }) {
    const s = statusStyle[status] ?? statusStyle[1];
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {reviewStatusMap[status] ?? "Pending"}
        </span>
    );
}

function Avatar({ name, image, onImageClick }: { name: string; image?: string; onImageClick?: () => void }) {
    const initials = name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) ?? "?";
    if (image) {
        return (
            <img
                src={image}
                alt={name}
                onClick={onImageClick}
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow cursor-pointer hover:opacity-80 transition"
            />
        );
    }
    return (
        <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-2xl font-bold border-2 border-white shadow">
            {initials}
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="flex flex-col gap-0.5 py-2 border-b border-gray-100 last:border-0">
            <span className="text-xs text-gray-500">{label}</span>
            <span className="text-sm font-medium text-gray-900">{value || "—"}</span>
        </div>
    );
}

function ImageLightbox({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img
                    src={imageUrl}
                    alt="Enlarged view"
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-lg"
                >
                    <svg className="w-5 h-5 text-gray-700" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default function Show() {
    const { rider, toastMessage } = usePage<Props>().props;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (toastMessage) {
            toast.success(toastMessage);
        }
    }, [toastMessage]);

    return (
        <AppLayout>
            <Head title={`Rider Review - ${rider.name}`} />

            {/* Image Lightbox */}
            {selectedImage && (
                <ImageLightbox imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
            )}

            <div className="p-4 md:p-8 w-full space-y-6">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <Link
                                href={route('riders.account.review.request')}
                                className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2"
                            >
                                &#8592; Back to Riders
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">Rider Review</h1>
                        </div>
                        <StatusBadge status={rider.review_status ?? 1} />
                    </div>

                    {/* Rider Profile Card */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-sm font-semibold text-gray-700 mb-5">Rider Information</h2>
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-shrink-0">
                                <Avatar 
                                    name={rider.name} 
                                    image={rider.profile_image}
                                    onImageClick={() => rider.profile_image && setSelectedImage(rider.profile_image)}
                                />
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                                <InfoRow label="Full Name" value={rider.name} />
                                <InfoRow label="Email" value={rider.email} />
                                <InfoRow label="Phone" value={rider.phone_number} />
                                <InfoRow label="Gender" value={rider.gender} />
                                <InfoRow label="Date of Birth" value={rider.dob} />
                                <InfoRow
                                    label="Member Since"
                                    value={new Date(rider.created_at).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div>
                        <h2 className="text-sm font-semibold text-gray-700 mb-4">Submitted Documents</h2>

                        {rider.user_riders.length > 0 ? (
                            <div className="space-y-5">
                                {rider.user_riders.map((doc) => {
                                    const docStatus = doc.review_status ?? 1;
                                    return (
                                        <div
                                            key={doc.id}
                                            className="bg-white border border-gray-200 rounded-xl p-6"
                                        >
                                            {/* Doc Meta */}
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {doc.document_type}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        #{doc.document_number}
                                                    </p>
                                                </div>
                                                <StatusBadge status={docStatus} />
                                            </div>

                                            {doc.remarks && (
                                                <div className="bg-yellow-50 border border-yellow-100 rounded-lg px-4 py-3 mb-5">
                                                    <p className="text-xs text-yellow-800">
                                                        <span className="font-semibold">Remarks: </span>
                                                        {doc.remarks}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Document Images */}
                                            {doc.document.length > 0 && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                                    {doc.document.map((fileUrl, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setSelectedImage(fileUrl)}
                                                            className="block group text-left"
                                                        >
                                                            <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                                                <img
                                                                    src={fileUrl}
                                                                    alt={`${doc.document_type} ${index + 1}`}
                                                                    className="w-full h-56 object-cover group-hover:opacity-75 transition cursor-pointer"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition">
                                                                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M21 21H3V3h9V1H3a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-9h-2v9z" fill="currentColor" />
                                                                        <path d="M19 4h-3V1h-2v3h-3v2h3v3h2V6h3V4z" fill="currentColor" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            <p className="text-xs text-gray-400">
                                                Submitted: {new Date(doc.created_at).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                                <p className="text-sm text-gray-400">No documents submitted yet</p>
                            </div>
                        )}
                    </div>

                    {/* Action Panel */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <p className="text-xs text-gray-500 mb-4">Take action on this rider's account</p>
                        <div className="flex gap-3 flex-wrap">
                            <Link
                                href={route('riders.rider.account.approve', { user_id: rider.id, status_type: 2 })}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Approve Rider
                            </Link>
                            <Link
                                href={route('riders.rider.account.approve', { user_id: rider.id, status_type: 3 })}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-sm font-medium rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                                Reject Rider
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}