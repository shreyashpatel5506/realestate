import connectMongo from "@/app/db";
import Favorites from "@/app/models/Favorites";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo();

        // Get userId from headers
        const userId = req.headers.get("userId");

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }

        // Get property ID from URL
        const { searchParams } = new URL(req.url);
        const propertiesId = searchParams.get("pid");

        if (!propertiesId) {
            return NextResponse.json(
                { success: false, message: "Property ID is missing in URL" },
                { status: 400 }
            );
        }

        // Create favorite document
        const favourite = {
            User: userId,
            property: propertiesId
        };

        const savedFavorite = await Favorites.create(favourite);

        return NextResponse.json(
            {
                success: true,
                message: "Added to favorites",
                favourite: savedFavorite
            },
            { status: 200 }
        );


    } catch (error) {
        console.error("🔥 ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error adding to favorites",
                error: error.message
            },
            { status: 500 }
        );
    }
}
