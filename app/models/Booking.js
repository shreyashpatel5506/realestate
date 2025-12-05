// user

// property

// visitDate

// status
// "pending" | "confirmed" | "cancelled"

// createdAt
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'propertySchema',
        require: true
    },
    VisitDate: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Booked', 'Cancel'],
        required: true,
    },
})

module.exports = mongoose.model('Booking', BookingSchema);