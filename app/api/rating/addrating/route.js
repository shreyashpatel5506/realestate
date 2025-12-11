import connectMongo from "@/app/db";
import Ratings from "@/app/models/Ratings";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo();

        const { searchParams } = new URL(req.url);
        const AgentId = searchParams.get("aid");

        const userId = req.headers.get("userId");

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }

        const { rating } = await req.json()
        if (rating > 5 || rating < 1) {
            return NextResponse.json({
                success: false,
                message: "Error Please ratring between the 1 to 5 "
            }, { status: 400 })
        }
        const newRating = await Ratings.create({
            user: userId,
            Agent: AgentId,
            rating: rating,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Rating added successfully",
                rating: newRating,
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error during to add rating"
        }, { status: 500 })
    }
}