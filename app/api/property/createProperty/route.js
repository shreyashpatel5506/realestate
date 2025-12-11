import connectMongo from "@/app/db";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import Property from "@/app/models/Property";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        await connectMongo();

        const formData = await req.formData();

        const title = formData.get("title");
        const description = formData.get("description");
        const moredetails = formData.get("moredetails");
        const price = formData.get("price");
        const type = formData.get("type");
        const category = formData.get("category");
        const address = formData.get("address");
        const city = formData.get("city");
        const state = formData.get("state");
        const bedrooms = formData.get("bedrooms");
        const bathrooms = formData.get("bathrooms");
        const areaSqFt = formData.get("areaSqFt");
        const status = formData.get("status");

        const imageFiles = formData.getAll("images");

        const uploadedImages = await Promise.all(
            imageFiles.map(async (file) => {
                const buffer = Buffer.from(await file.arrayBuffer());
                const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

                const uploadRes = await cloudinary.uploader.upload(base64, {
                    folder: "properties",
                });

                return uploadRes.secure_url;
            })
        );
        console.log("🔥 AgentID received:", req.headers.get("userId"));
        const agentId = req.headers.get("userId");

        if (!agentId) {
            return NextResponse.json(
                { success: false, message: "Agent ID missing from middleware" },
                { status: 400 }
            );
        }
        const newProperty = await Property.create({
            title,
            description,
            moredetails,
            price,
            type,
            category,
            address,
            city,
            state,
            bedrooms,
            bathrooms,
            areaSqFt,
            status,
            Agent: agentId,
            images: uploadedImages,
        });

        return NextResponse.json({
            success: true,
            message: "Property created successfully!",
            newProperty,
        });

    } catch (error) {
        console.error("Create Property Error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
