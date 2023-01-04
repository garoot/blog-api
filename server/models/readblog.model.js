const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReadBlogSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }
})

const readBlog = mongoose.model('readBlog', ReadBlogSchema)
module.exports = readBlog