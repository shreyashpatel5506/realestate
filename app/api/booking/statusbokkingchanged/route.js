import connectMongo from "@/app/db"
import Booking from "@/app/models/Booking";
import { NextResponse } from "next/server"

export async function PUT(req) {
    try {
        await connectMongo();

        const userId = req.headers.get("userId");

        const { searchParams } = new URL(req.url);
        const BookingId = searchParams.get("bid");

        if (!BookingId) {
            return NextResponse.json(
                { success: false, message: "BookingId ID missing in URL (bid)" },
                { status: 400 }
            );
        }
        const checkBooking = await Booking.findById(BookingId);
        if (!checkBooking) {
            return NextResponse.json(
                { success: false, message: "Property not found!" },
                { status: 404 }
            );
        }


        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }

        const { status: newStatus } = await req.json();

        const updatedBooking = await Booking.findByIdAndUpdate(checkBooking, {
            status: newStatus
        }, { new: true })

        return NextResponse.json({
            success: true,
            message: "successfull booking status update",
            updatedBooking
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "error when status update for booking"
        }, { status: 500 })
    }
}