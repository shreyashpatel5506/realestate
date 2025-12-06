import connectMongo from "@/app/db";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo()

        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "any one feild is empty"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "No user is found by this email"
            }, { status: 400 })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWTSECRET,
            { expiresIn: "7d" }
        );


        return NextResponse.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error in the login"
        }, { status: 500 })
    }
}