const mongoose = require('mongoose');
const {Schema} = mongoose;

const CommentSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
    },
    text: String
}, {timestamps: true, collection: 'comments'}
)

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment;