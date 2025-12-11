import connectMongo from "@/app/db";
import Property from "@/app/models/Property";
import { NextResponse } from "next/server";
import User from "@/app/models/User";

export async function PUT(req) {
    try {
        await connectMongo();

        const { searchParams } = new URL(req.url);
        const propertiesId = searchParams.get("pid");

        // Direct destructuring (no body variable)
        const { status: newStatus } = await req.json();

        const updatedProperty = await Property.findByIdAndUpdate(
            propertiesId,
            { status: newStatus },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            message: "status updated",
            updatedProperty
        });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "error occurred while trying to update the status",
                error: error.message
            },
            { status: 500 }
        );
    }
}
