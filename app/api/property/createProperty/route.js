import connectMongo from "@/app/db";
import { NextResponse } from "next/server";


export async function POST(params) {
    try {
        await connectMongo()

        const { title, description, price, type, category, address, city, state, bedrooms, bathrooms, areaSqFt, status } = await req.json()


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "error during to create a poperty"
        }, { status: 500 })
    }
}