import connectMongo from "@/app/db";
import Property from "@/app/models/Property";
import { NextResponse } from "next/server";
import User from "@/app/models/User";

export async function GET(req) {
    try {
        await connectMongo()

        const { searchParams } = new URL(req.url);
        const propertiesId = searchParams.get("pid");


        if (!propertiesId) {
            return NextResponse.json({
                success: false,
                message: "propertyid is missing"
            }, { status: 400 })
        }

        const property = await Property.findById(propertiesId).populate("Agent")

        if (!property) {
            return NextResponse.json({
                success: false,
                message: "property is not match"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "proeprty finally found by the id",
            property
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error getting whe try to access single property"
        }, { status: 500 })
    }
}