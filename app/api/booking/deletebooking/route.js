import connectMongo from "@/app/db"
import Booking from "@/app/models/Booking";
import { NextResponse } from "next/server"

export async function DELETE(req) {
    try {
        await connectMongo()

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
                { success: false, message: "Booking not found!" },
                { status: 404 }
            );
        }


        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }

        await Booking.findByIdAndDelete(BookingId)
        return NextResponse.json({
            success: true,
            message: "successfull deleted"
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "error when deletebooking",
        }, { status: 500 })
    }
}