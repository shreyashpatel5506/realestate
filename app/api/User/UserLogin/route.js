import connectMongo from "@/app/db";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "Email or password is missing"
            }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "No user found with this email"
            }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            }, { status: 401 });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 👇 IMPORTANT FIX — CREATE RESPONSE FIRST
        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

        // 👇 NOW SET COOKIE
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        return response;

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({
            success: false,
            message: "Server error occurred during login"
        }, { status: 500 });
    }
}
