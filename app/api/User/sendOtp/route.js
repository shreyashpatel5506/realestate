import connectMongo from "@/app/db";
import Otp from "@/app/models/otp";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        await connectMongo();

        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({
                success: false,
                message: 'Please enter email'
            }, { status: 400 });
        }

        // Generate 4-digit OTP
        const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

        // Save OTP in DB
        await Otp.create({
            email,
            otp: randomOtp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });

        // Email setup
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // HTML template with OTP injected
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>Homely OTP</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color:#f7f7f7; padding:20px;">
            <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; padding:20px;">
                <tr>
                    <td style="text-align:center;">
                        <h2 style="color:#2c3e50;">Welcome to <span style="color:#3498db;">Homely</span></h2>
                        <p style="font-size:16px; color:#555;">
                            Your verification code is here!
                        </p>

                        <div style="background:#3498db; color:#fff; margin:20px auto; padding:15px 20px; font-size:24px; font-weight:bold; letter-spacing:4px; border-radius:8px; width:200px;">
                            ${randomOtp}
                        </div>

                        <p style="font-size:14px; color:#777;">
                            This OTP is valid for the next <strong>5 minutes</strong>.
                            Please do not share it with anyone.
                        </p>

                        <p style="font-size:14px; color:#555;">
                            If you did not request this, kindly ignore this email.
                        </p>

                        <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;" />

                        <p style="font-size:12px; color:#999;">
                            © 2025 Homely — Your trusted Real Estate companion.
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;

        // Send mail
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Your Homely Verification Code",
            html: htmlContent, // IMPORTANT: use html field
        });

        return NextResponse.json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error sending OTP",
        }, { status: 500 });
    }
}
