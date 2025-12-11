import connectMongo from "@/app/db";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongo()

        const { searchParams } = new URL(req.url);
        const UserId = searchParams.get("uid");

        if (!UserId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Error during to fetch profileand userid is not in token , login required"
                }, { status: 400 }
            )
        }
        const userProfile = await User.findById(UserId).lean();


        return NextResponse.json(
            {
                success: true,
                message: "Profile getting successfully",
                userProfile
            }, { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Error getting when user profile fetch"
        }, {
            status: 500
        })
    }
}