const mongoose = require('mongoose');
const {Schema} = mongoose;

const WishListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "you must assign a student to this wishList"]
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "you must assign a course to this wishList"]
    }
}, {timestamps: true})

const wishList = mongoose.model('wishList', WishListSchema)
module.exports = wishList