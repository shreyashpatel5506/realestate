
import mongoose, { Mongoose } from "mongoose";

const FavoritiesSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'propertySchema',
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Favorities', FavoritiesSchema);