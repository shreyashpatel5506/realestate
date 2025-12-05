import connectMongo from "@/app/db";
import { NextResponse } from "next/server";

export default async function POST(req, res) {
    try {
        await connectMongo()


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error during to create a User",

        }, { status: 500 })
    }

}