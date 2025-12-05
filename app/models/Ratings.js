// user
// agent
// rating
// comment
// createdAt
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

module.exports = mongoose.model('Rating', RatingSchema);