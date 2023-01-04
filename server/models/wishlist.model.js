const mongoose = require('mongoose');
const {Schema} = mongoose;

const wishListSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    }
}, {timestamps: true})

const wishList = mongoose.model('wishList', wishListSchema)
module.exports = wishList