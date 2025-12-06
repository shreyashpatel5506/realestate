
import { Mongoose, mongoose } from "mongoose"
const RatingSchema = new Mongoose.Schema({
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
        require: true
    }
},
    { timeStamp: true }
)

export default mongoose.models.Rating || mongoose.model('Rating', RatingSchema);