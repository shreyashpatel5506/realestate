import connectMongo from "@/app/db";
import Otp from "@/app/models/otp";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo()

        const { email, otp } = await req.json()

        if (!email || !otp) {
            return NextResponse.json({
                success: false,
                message: "Not Completed feild"
            }, { status: 400 })
        }

        const record = await Otp.findOne({ email, otp });

        if (!record) {
            return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
        }
        if (record.expiresAt < new Date()) {
            return NextResponse.json({ success: false, message: "OTP expired" }, { status: 400 });
        }
        const res = NextResponse.json({ success: true, message: "OTP Verified" });

        res.cookies.set("verifiedEmail", email, {
            httpOnly: true,
            maxAge: 10 * 60,
        });

        await Otp.deleteOne({ email });

        return res;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error duriung the verify otp"
        },
            {
                status: 500
            })
    }
}