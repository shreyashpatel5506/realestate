const { Mongoose, Types, default: mongoose } = require("mongoose");

const User = Mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Otp',
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            enum: ["Agent", "User"],
            required: true,
            default: User
        }
    }, { timestamps: true }
)

module.exports = Mongoose.model("User", User);