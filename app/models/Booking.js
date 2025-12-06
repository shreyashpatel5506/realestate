
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
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



export default mongoose.model('Booking', BookingSchema);