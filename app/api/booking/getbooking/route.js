import connectMongo from "@/app/db"
import Booking from "@/app/models/Booking";
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        await connectMongo()

        const userId = req.headers.get("userId");

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }

        const Bookingpropertys = await Booking.find({ User: userId }).populate("property")

        if (!Bookingpropertys) {
            return NextResponse.json({
                success: false,
                message: "No booking property is avilable"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: " fetch successfully"
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Error wen try to get the booking property"
        }, { status: 500 })
    }

}