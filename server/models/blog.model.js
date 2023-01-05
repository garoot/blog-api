const mongoose = require('mongoose');
const {Schema} = mongoose;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, "must enter a title for your blog"]
    },
    headline: {
        type: String,
        required: [true, "must enter a headline for your blog"]
    },
    content: String,
    profilePic: String,
    producer: {
        type: Schema.Types.ObjectId,
        ref: "Producer",
        required: [true, "you must assign a creator for this blog"]
    },
    keywords: [{
        type: Schema.Types.ObjectId,
        ref: "Keyword"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    readLength: Number,
    likes: Number,
    saves: Number,
    views: Number,
    studentsRead: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    studentsSaved: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]

}, {timestamps: true, collection: 'blogs'}
)

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;