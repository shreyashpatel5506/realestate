import connectMongo from "@/app/db";
import Booking from "@/app/models/Booking";
import Property from "@/app/models/Property";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongo();

        const agentId = req.headers.get("userId");

        if (!agentId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }

        // 🔥 Fetch only properties created by this agent
        const agentProperties = await Property.find({ Agent: agentId }).select("_id");

        const propertyIds = agentProperties.map(p => p._id);

        // 🔥 Fetch bookings done on those properties
        const bookings = await Booking.find({
            property: { $in: propertyIds }
        }).populate("property user");

        return NextResponse.json({
            success: true,
            message: "Agent bookings fetched successfully",
            data: bookings
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error fetching agent bookings"
        }, { status: 500 });
    }
}
