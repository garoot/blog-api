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
        ref: "Producer"
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
    views: Number

}, {timestamps: true, collection: 'blogs'}
)

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;