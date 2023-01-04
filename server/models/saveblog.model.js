const mongoose = require('mongoose');
const {Schema} = mongoose;

const SavedBlogSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }
})

const savedBlog = mongoose.model('savedBlog', SavedBlogSchema)
module.exports = savedBlog