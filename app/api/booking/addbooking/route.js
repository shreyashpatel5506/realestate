import connectMongo from "@/app/db"
import Booking from "@/app/models/Booking";
import Property from "@/app/models/Property";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await connectMongo()

        // Get Body
        const { visitDate, status } = await req.json()

        // Get User ID from middleware
        const userId = req.headers.get("userId");

        // Get property ID from URL query
        const { searchParams } = new URL(req.url);
        const PropertyId = searchParams.get("pid");

        if (!PropertyId) {
            return NextResponse.json(
                { success: false, message: "Property ID missing (pid)" },
                { status: 400 }
            );
        }

        // Check property exists
        const checkProperty = await Property.findById(PropertyId);
        if (!checkProperty) {
            return NextResponse.json(
                { success: false, message: "Property not found!" },
                { status: 404 }
            );
        }

        // Check user ID
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }

        // Validate body
        if (!visitDate || !status) {
            return NextResponse.json(
                { success: false, message: "Visit date or status missing" },
                { status: 400 }
            )
        }

        // Create booking
        const booking = await Booking.create({
            user: userId,
            property: PropertyId,
            visitDate,
            status
        })

        return NextResponse.json({
            success: true,
            message: "Booking successful!",
            booking
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Booking error occurred"
        }, { status: 500 })
    }
}
