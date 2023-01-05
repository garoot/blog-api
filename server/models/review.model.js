const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReviewSchema = new Schema({
    rating: Number,
    comment: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    }
}, {timestamps: true, collection: 'reviews'})


const Review = mongoose.model('Review', ReviewSchema)
module.exports = Review