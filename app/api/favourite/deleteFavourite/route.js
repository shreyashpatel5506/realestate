import connectMongo from "@/app/db";
import Favorites from "@/app/models/Favorites";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        await connectMongo();

        const userId = req.headers.get("userId");

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }

        const { searchParams } = new URL(req.url);
        const propertyId = searchParams.get("pid");

        if (!propertyId) {
            return NextResponse.json(
                { success: false, message: "propertyId is missing" },
                { status: 400 }
            );
        }

        // Delete favorite for the user for this specific property
        const deletedFavourite = await Favorites.findOneAndDelete({
            userId,
            propertyId,
        });

        if (deletedFavourite) {
            return NextResponse.json(
                { success: false, message: "Favourite not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Delete favourite not working",
        });
    }
}
