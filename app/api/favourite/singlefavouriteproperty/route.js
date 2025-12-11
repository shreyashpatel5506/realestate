import connectMongo from "@/app/db"
import Favorites from "@/app/models/Favorites";
import { NextResponse } from "next/server"
import User from "@/app/models/User";
import Property from "@/app/models/Property";

export async function GET(req) {
    try {
        await connectMongo();

        const { searchParams } = new URL(req.url);
        const FavouriteId = searchParams.get("fid");

        if (!FavouriteId) {
            return NextResponse.json({
                success: false,
                message: "Favouriteid is not getting"
            }, { status: 400 })
        }

        const FavoritesProperty = await Favorites.findById(FavouriteId).populate("property").populate("User", "name email")

        if (!FavoritesProperty) {
            return NextResponse.json({
                success: false,
                message: "No any favourite property is not find"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "Successfully found Property",
            FavoritesProperty
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Error when try to single property for favourite"
        })
    }
}