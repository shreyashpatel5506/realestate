import connectMongo from "@/app/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";

export async function POST(req) {
    try {
        await connectMongo();

        const { name, phoneNumber, role, password } = await req.json();

        const verifiedEmail = req.cookies.get("verifiedEmail")?.value;

        if (!name || !phoneNumber || !role || !password) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        if (!verifiedEmail) {
            return NextResponse.json(
                { success: false, message: "Email is not verified" },
                { status: 403 }
            );
        }

        // phone number must be numeric
        if (isNaN(phoneNumber)) {
            return NextResponse.json(
                { success: false, message: "Phone number must be digits only" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in DB
        const newUser = await User.create({
            name,
            email: verifiedEmail,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        // Generate token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Prepare response
        const response = NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                user: newUser,
                token,
            },
            { status: 200 }
        );

        // Delete the OTP email cookie
        response.cookies.delete("verifiedEmail");

        return response;
    } catch (error) {
        console.error("Register Error:", error);

        return NextResponse.json(
            { success: false, message: "Error while creating user" },
            { status: 500 }
        );
    }
}
