import connectMongo from "@/app/db";
import Property from "@/app/models/Property";
import { NextResponse } from "next/server";

export async function DELETE(req) {
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

        const property = await Property.findById(propertiesId);
        if (!property) {
            return NextResponse.json(
                { success: false, message: "Property not found" },
                { status: 404 }
            );
        }

        // Check ownership
        if (property.Agent.toString() !== tokenAgentId.toString()) {
            return NextResponse.json(
                { success: false, message: "Forbidden: You are not the owner" },
                { status: 403 }
            );
        }

        await Property.findByIdAndDelete(propertiesId);

        return NextResponse.json(
            { success: true, message: "Property deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error deleting property", error: error.message },
            { status: 500 }
        );
    }
}
