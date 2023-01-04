const mongoose = require('mongoose');
const {Schema} = mongoose;

const SavedBlogSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: [true, "you must assign a student to this savedBlog"]
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: [true, "you must assign a blog to this savedBlog"]
    }
})

const savedBlog = mongoose.model('savedBlog', SavedBlogSchema)
module.exports = savedBlog