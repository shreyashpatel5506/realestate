
import mongoose from "mongoose";

const FavoritiesSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        require: true
    }
}, {
    timestamps: true
})


export default mongoose.models.Favorities || mongoose.model('Favorities', FavoritiesSchema);