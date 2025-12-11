import connectMongo from "@/app/db";
import Property from "@/app/models/Property";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        await connectMongo();

        const { searchParams } = new URL(req.url);
        const propertiesId = searchParams.get("pid");

        const deletedProperty = await Property.findByIdAndDelete(propertiesId);

        if (!deletedProperty) {
            return NextResponse.json({
                success: false,
                message: "Property not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Deleted successfully"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error deleting property",
            error: error.message
        }, { status: 500 });
    }
}
