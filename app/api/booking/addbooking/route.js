import connectMongo from "@/app/db"
import Booking from "@/app/models/Booking";
import Property from "@/app/models/Property";
//
import User from "@/app/models/User"; // <-- ADD THIS IMPORT
import { sendEmail, generatePropertyCardHtml } from "@/app/utils/sendEmail"; // <-- ADD THIS IMPORT
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await connectMongo()
        // ... (existing code to get body, userId, and PropertyId)
        
        // Get Body
        const { VisitDate, status } = await req.json()

        // Get User ID from middleware
        const userId = req.headers.get("userId");

        // Get property ID from URL query
        const { searchParams } = new URL(req.url);
        const PropertyId = searchParams.get("pid");

        if (!PropertyId) {
            return NextResponse.json(
                { success: false, message: "Property ID missing (pid)" },
                { status: 400 }
            );
        }

        // Check property exists and populate Agent info
        // MODIFIED: Use .populate('Agent') to get agent details (specifically the Agent's ID and email).
        const checkProperty = await Property.findById(PropertyId).populate('Agent'); 
        if (!checkProperty) {
            return NextResponse.json(
                { success: false, message: "Property not found!" },
                { status: 404 }
            );
        }

        // Check user ID
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }
        
        // MODIFIED: Fetch the booking user's details for the email
        const bookingUser = await User.findById(userId);
        if (!bookingUser) {
            return NextResponse.json(
                { success: false, message: "Booking user not found!" },
                { status: 404 }
            );
        }
        
        // Validate body
        if (!VisitDate || !status) {
            return NextResponse.json(
                { success: false, message: "Visit date or status missing" },
                { status: 400 }
            )
        }

        // Create booking
        const booking = await Booking.create({
            user: userId,
            property: PropertyId,
            VisitDate,
            status
        })

        // --- EMAIL LOGIC START ---
        const propertyCardHtml = generatePropertyCardHtml(checkProperty, VisitDate, status);

        // 1. Email to the User (client)
        const userEmailSubject = `✅ Booking Confirmation for ${checkProperty.title}`;
        const userEmailHtml = `
            <h1 style="color: #007bff;">Booking Successful!</h1>
            <p>Dear ${bookingUser.name},</p>
            <p>Your booking for a visit to the property has been successfully created and is currently <strong>${status.toUpperCase()}</strong>.</p>
            <p>Here are the details of your booking:</p>
            ${propertyCardHtml}
            <p>We will notify you once the agent updates the status.</p>
            <p>Thank you.</p>
        `;
        sendEmail(bookingUser.email, userEmailSubject, userEmailHtml);

        // 2. Email to the Agent
        const agentEmailSubject = `🔔 New Property Booking on ${checkProperty.title}`;
        const agentEmailHtml = `
            <h1 style="color: #28a745;">New Booking Alert!</h1>
            <p>Dear ${checkProperty.Agent.name},</p>
            <p>A new booking has been made for your property: <strong>${checkProperty.title}</strong>.</p>
            <p>Please review the details below and update the status in your dashboard.</p>
            ${generatePropertyCardHtml(checkProperty, VisitDate, status, bookingUser)}
            <p>Thank you.</p>
        `;
        sendEmail(checkProperty.Agent.email, agentEmailSubject, agentEmailHtml);
        // --- EMAIL LOGIC END ---

        return NextResponse.json({
            success: true,
            message: "Booking successful!",
            booking
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Booking error occurred"
        }, { status: 500 })
    }
}