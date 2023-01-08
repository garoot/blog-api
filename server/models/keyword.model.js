const mongoose = require('mongoose');
const {Schema} = mongoose;
var uniqueValidator = require('mongoose-unique-validator');


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
    }],
    fields: [{
        type: Schema.Types.ObjectId,
        ref: "Field"
    }]

}, {timestamps: true, collection: 'keywords'}
)
KeywordSchema.plugin(uniqueValidator)
const Keyword = mongoose.model('Keyword', KeywordSchema);
module.exports = Keyword;