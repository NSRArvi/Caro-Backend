<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code - TheCaro</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        /* Header Section */
        .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        
        .app-name {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin: 0;
        }
        
        .tagline {
            font-size: 12px;
            opacity: 0.9;
            margin-top: 5px;
        }
        
        /* Main Content */
        .email-content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .message {
            font-size: 14px;
            color: #666;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        
        .purpose-section {
            background-color: #f9f9f9;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin-bottom: 30px;
            border-radius: 4px;
        }
        
        .purpose-label {
            font-size: 12px;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
        }
        
        .purpose-text {
            font-size: 15px;
            color: #333;
            font-weight: 500;
        }
        
        /* OTP Box */
        .otp-section {
            text-align: center;
            margin: 40px 0;
        }
        
        .otp-label {
            font-size: 12px;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            display: block;
        }
        
        .otp-code {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 8px;
            padding: 25px;
            border-radius: 8px;
            display: inline-block;
            font-family: 'Courier New', monospace;
            min-width: 280px;
        }
        
        /* Validity Section */
        .validity-section {
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            border-radius: 4px;
            padding: 15px;
            margin: 30px 0;
            text-align: center;
        }
        
        .validity-icon {
            font-size: 20px;
            margin-right: 8px;
        }
        
        .validity-text {
            font-size: 14px;
            color: #856404;
            font-weight: 500;
        }
        
        /* Security Notice */
        .security-section {
            background-color: #e8f4f8;
            border-left: 4px solid #17a2b8;
            padding: 15px;
            margin: 30px 0;
            border-radius: 4px;
        }
        
        .security-title {
            font-size: 13px;
            color: #155e75;
            font-weight: 600;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }
        
        .security-icon {
            margin-right: 8px;
            font-size: 16px;
        }
        
        .security-text {
            font-size: 13px;
            color: #0c5460;
            line-height: 1.6;
        }
        
        /* Footer Section */
        .email-footer {
            background-color: #f9f9f9;
            border-top: 1px solid #eee;
            padding: 25px 30px;
            text-align: center;
            font-size: 12px;
            color: #999;
        }
        
        .footer-text {
            margin-bottom: 10px;
        }
        
        .social-links {
            margin-top: 15px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
            font-size: 12px;
        }
        
        /* Responsive Design */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .email-header {
                padding: 20px 15px;
            }
            
            .app-name {
                font-size: 24px;
            }
            
            .email-content {
                padding: 25px 15px;
            }
            
            .greeting {
                font-size: 16px;
            }
            
            .message {
                font-size: 13px;
            }
            
            .purpose-section {
                padding: 12px;
            }
            
            .otp-code {
                font-size: 28px;
                letter-spacing: 6px;
                padding: 20px;
                min-width: 100%;
                margin: 0 -15px;
                width: calc(100% + 30px);
            }
            
            .otp-section {
                margin: 30px -15px;
            }
            
            .email-footer {
                padding: 20px 15px;
                font-size: 11px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1 class="app-name">The Caro</h1>
            <p class="tagline">Secure Authentication</p>
        </div>
        
        <!-- Main Content -->
        <div class="email-content">
            <!-- Greeting -->
            <p class="greeting">Hi {{ $userName ?? 'there' }},</p>
            
            <!-- Message -->
            <p class="message">
                We received a request to verify your identity. Use the code below to complete your {{ $action ?? 'authentication' }}.
            </p>
            
            {{-- <!-- Purpose Section -->
            <div class="purpose-section">
                <span class="purpose-label">Purpose</span>
                <p class="purpose-text">
                    {{ $purpose ?? 'Account Verification' }}
                </p>
            </div> --}}
            
            <!-- OTP Code -->
            <div class="otp-section">
                <span class="otp-label">Your Verification Code</span>
                <div class="otp-code">{{ $otp }}</div>
            </div>
            
            <!-- Validity -->
            <div class="validity-section">
                <span class="validity-icon">⏱️</span>
                <span class="validity-text">This code is valid for <strong>{{ $validityMinutes ?? 3 }} minutes</strong></span>
            </div>
            
            <!-- Security Notice -->
            <div class="security-section">
                <div class="security-title">
                    <span class="security-icon">🔒</span>
                    <span>Security Notice</span>
                </div>
                <p class="security-text">
                    Never share this code with anyone. TheCaro support staff will never ask for your OTP code. 
                    If you didn't request this code, please ignore this email.
                </p>
            </div>
            
            <!-- Additional Info -->
            <p class="message" style="margin-top: 30px; font-size: 13px; color: #999;">
                If you have any questions, please contact our support team.
            </p>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <p class="footer-text">© 2026 TheCaro. All rights reserved.</p>
            <p class="footer-text">This is an automated message, please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>