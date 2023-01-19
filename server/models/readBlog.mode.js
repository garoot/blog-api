const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReadBlogSchema = new Schema({
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

const readBlog = mongoose.model('readBlog', ReadBlogSchema)
module.exports = readBlog