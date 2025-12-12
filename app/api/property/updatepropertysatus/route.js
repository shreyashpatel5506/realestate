import connectMongo from "@/app/db";
import Property from "@/app/models/Property";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        await connectMongo();

        const tokenAgentId = req.headers.get("userId");
        if (!tokenAgentId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: userId missing" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const propertiesId = searchParams.get("pid");

        if (!propertiesId) {
            return NextResponse.json(
                { success: false, message: "Property id (pid) required" },
                { status: 400 }
            );
        }

        const { status: newStatus } = await req.json();
        if (!newStatus) {
            return NextResponse.json(
                { success: false, message: "New status is required" },
                { status: 400 }
            );
        }

        const property = await Property.findById(propertiesId);

        if (!property) {
            return NextResponse.json(
                { success: false, message: "Property not found" },
                { status: 404 }
            );
        }

        // Check if logged in user owns the property
        if (property.agentId.toString() !== tokenAgentId.toString()) {
            return NextResponse.json(
                { success: false, message: "Forbidden: You cannot update this property" },
                { status: 403 }
            );
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            propertiesId,
            { status: newStatus },
            { new: true }
        );

        return NextResponse.json(
            { success: true, message: "Status updated successfully", updatedProperty },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error updating status", error: error.message },
            { status: 500 }
        );
    }
}
