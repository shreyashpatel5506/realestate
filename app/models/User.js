const { Mongoose, Types } = require("mongoose");

const User = Mongoose.Schema(
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
            require: true
        },
        role: {
            type: String,
            enum: ["Agent", "Admin"],
            required: true
        }
    }, { timestamps: true }
)

module.exports = Mongoose.model("User", User);