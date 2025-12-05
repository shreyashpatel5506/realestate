import connectMongo from "@/app/db";
import { NextResponse } from "next/server";

export default async function POST(req, res) {
    try {
        await connectMongo()
        const { name, email, phoneNumber, role, password } = await req.json()

        if (!name || !email || !phoneNumber || !role || !password) {
            return NextResponse.json({
                success: false,
                message: "any feild is empty"
            }, { status: 203 })
        }

        // const hashedPassword = bcrypt.hash('password')


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error during to create a User",

        }, { status: 500 })
    }

}