import connectMongo from "@/app/db";
import Favorites from "@/app/models/Favorites";
import { NextResponse } from "next/server";
import User from "@/app/models/User"; // require because evey time when we pass the request than show error when we use populate than import db
import Property from "@/app/models/Property";

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

        const favouriteProperty = await Favorites.find({ User: userId }).populate("property").populate("User", "name email")

        if (favouriteProperty.length == 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No any favourite"
                }, { status: 400 }
            )
        }
        return NextResponse.json(
            {
                success: true,
                message: "successfully fetch all favouritejs files",
                favouriteProperty
            }, { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Error getting when try to get all favourite list"
        }, { status: 500 }
        )

    }
}