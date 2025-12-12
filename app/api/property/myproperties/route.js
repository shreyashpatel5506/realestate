import connectMongo from "@/app/db";
import Property from "@/app/models/Property";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongo();

        const tokenAgentId = req.headers.get("userId");

        if (!tokenAgentId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: userId missing" },
                { status: 401 }
            );
        }

        const properties = await Property.find({ agentId: tokenAgentId })
            .populate("agentId", "name phone");

        return NextResponse.json(
            { success: true, properties },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Error fetching properties", error: error.message },
            { status: 500 }
        );
    }
}
