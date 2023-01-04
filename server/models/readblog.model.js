const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReadBlogSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: [true, "you must assign a student to this readBlog"]
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: [true, "you must assign a blog to this readBlog"]
    }
})

const readBlog = mongoose.model('readBlog', ReadBlogSchema)
module.exports = readBlog