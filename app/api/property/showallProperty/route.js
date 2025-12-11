import connectMongo from "@/app/db";
import Property from "@/app/models/Property";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo();

        const properties = await Property.find().populate("Agent");

        return NextResponse.json({
            success: true,
            properties,
            message: "Fetched successfully"
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Error fetching properties"
        }, { status: 500 });
    }
}
