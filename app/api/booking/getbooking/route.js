import connectMongo from "@/app/db";
import Booking from "@/app/models/Booking";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongo();

        const userId = req.headers.get("userId");

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }

        // FIXED FIELD NAME: user  (NOT User)
        const Bookingpropertys = await Booking.find({ user: userId }).populate("property");

        return NextResponse.json({
            success: true,
            data: Bookingpropertys,
            message: "Fetched successfully",
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error when trying to get the booking property"
        }, { status: 500 });
    }
}
