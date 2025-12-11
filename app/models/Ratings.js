
import { mongoose } from "mongoose"
const RatingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    Agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
},
    { timeStamp: true }
)

export default mongoose.models.Rating || mongoose.model('Rating', RatingSchema); 