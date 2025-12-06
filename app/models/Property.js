import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ['house', 'apartment', 'land', 'shop'],
            required: true,
        },
        category: {
            type: String,
            enum: ['rent', 'sale'],
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },

        bedrooms: {
            type: Number,
            default: 0,
        },
        bathrooms: {
            type: Number,
            default: 0,
        },
        areaSqFt: {
            type: Number,
            required: true,
        },

        images: [String],
        Agent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['available', 'sold', 'rented'],
            default: 'available',
        },
    },
    { timestamps: true }
);



const Property = mongoose.model("Property", propertySchema);
export default Property;