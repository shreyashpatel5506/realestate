import connectMongo from "@/app/db";
import { NextResponse } from "next/server";
import cloudinary from "@/app/cloudinary";
import Property from "@/app/models/Property";

export async function POST(req) {
    try {
        await connectMongo();

        const body = await req.json();
        const {
            title,
            description,
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
            images   // array of base64 images or URLs
        } = body;

        if (!images || images.length === 0) {
            return NextResponse.json(
                { success: false, message: "Images are required!" },
                { status: 400 }
            );
        }

        // ⬆️ Upload all images to Cloudinary
        const uploadedImages = await Promise.all(
            images.map(async (img) => {
                const uploadRes = await cloudinary.uploader.upload(img, {
                    folder: "properties",
                });
                return uploadRes.secure_url; // only return URL
            })
        );

        // ⬆️ Store property into MongoDB
        const newProperty = await Property.create({
            title,
            description,
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
            images: uploadedImages,
        });

        return NextResponse.json({
            success: true,
            message: "Property created successfully!",
            property: newProperty
        });

    } catch (error) {
        console.error("Create Property Error:", error);
        return NextResponse.json(
            { success: false, message: "Error creating property" },
            { status: 500 }
        );
    }
}
