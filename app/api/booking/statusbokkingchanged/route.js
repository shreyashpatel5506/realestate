import connectMongo from "@/app/db"
import Booking from "@/app/models/Booking";
//
import { sendEmail, generatePropertyCardHtml } from "@/app/utils/sendEmail"; // <-- ADD THIS IMPORT
import { NextResponse } from "next/server"

export async function PUT(req) {
    try {
        await connectMongo();

        const userId = req.headers.get("userId");

        const { searchParams } = new URL(req.url);
        const BookingId = searchParams.get("bid");

        if (!BookingId) {
            return NextResponse.json(
                { success: false, message: "BookingId ID missing in URL (bid)" },
                { status: 400 }
            );
        }

        // MODIFIED: Populate user and property, and then property's Agent
        let checkBooking = await Booking.findById(BookingId)
            .populate({
                path: 'property',
                populate: {
                    path: 'Agent',
                    model: 'User'
                }
            })
            .populate('user');

        if (!checkBooking) {
            return NextResponse.json(
                { success: false, message: "Booking not found!" }, // Changed from "Property not found!"
                { status: 404 }
            );
        }

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "userId missing from middleware" },
                { status: 400 }
            );
        }
        
        // Optional: Check if the updating user is the Agent of the property
        if (checkBooking.property.Agent._id.toString() !== userId) {
             return NextResponse.json(
                { success: false, message: "Unauthorized to update this booking" },
                { status: 403 }
            );
        }

        const { status: newStatus } = await req.json();

        const updatedBooking = await Booking.findByIdAndUpdate(BookingId, { // Fixed: pass BookingId instead of checkBooking object
            status: newStatus
        }, { new: true })
        // Use the populated checkBooking object for email content, but with the new status
        checkBooking.status = newStatus;

        // --- EMAIL LOGIC START ---
        const userEmail = checkBooking.user.email;
        const userEmailSubject = `📢 Booking Status Updated for ${checkBooking.property.title}`;
        
        // Determine color for UI based on status
        let statusColor = '#007bff';
        if (newStatus === 'booked') statusColor = '#28a745';
        else if (newStatus === 'cancel') statusColor = '#dc3545';
        
        // Email to the User (client)
        const userEmailHtml = `
            <h1 style="color: ${statusColor};">Booking Status Update!</h1>
            <p>Dear ${checkBooking.user.name},</p>
            <p>The status of your booking for the property <strong>${checkBooking.property.title}</strong> has been updated by the agent.</p>
            <p>The new status is: <span style="font-weight: bold; color: ${statusColor};">${newStatus.toUpperCase()}</span></p>
            <p>Here are the booking details:</p>
            ${generatePropertyCardHtml(checkBooking.property, checkBooking.VisitDate, newStatus)}
            <p>If you have any questions, please contact the agent ${checkBooking.property.Agent.name} at ${checkBooking.property.Agent.email}.</p>
        `;
        sendEmail(userEmail, userEmailSubject, userEmailHtml);
        // --- EMAIL LOGIC END ---

        return NextResponse.json({
            success: true,
            message: "successfull booking status update",
            updatedBooking
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "error when status update for booking"
        }, { status: 500 })
    }
}