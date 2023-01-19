const mongoose = require('mongoose');
const {Schema} = mongoose;

const SavedBlogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "you must assign a student to this wishList"]
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: [true, "you must assign a course to this wishList"]
    }
}, {timestamps: true})

const savedBlog = mongoose.model('savedBlog', SavedBlogSchema)
module.exports = savedBlog