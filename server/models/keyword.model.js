const mongoose = require('mongoose');
const {Schema} = mongoose;

const KeywordSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    icon: String,
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }],
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]

}, {timestamps: true, collection: 'keywords'}
)

const Keyword = mongoose.model('Keyword', KeywordSchema);
module.exports = Keyword;