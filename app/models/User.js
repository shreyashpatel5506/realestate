import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["agent", "user"],
            required: true,
            default: "user"
        }
    }, { timestamps: true }
)
export default mongoose.models.User || mongoose.model("User", UserSchema);