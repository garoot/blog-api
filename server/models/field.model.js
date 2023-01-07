const mongoose = require('mongoose');
const {Schema} = mongoose;

const FieldSchema = new Schema({
    name: String,
    iconPic: String,
    keywords: [{
        type: Schema.Types.ObjectId,
        ref: "Keyword"
    }],
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }],
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }],
    producers: [{
        type: Schema.Types.ObjectId,
        ref: "Producer"
    }]
}, {timestamps: true, collection: 'fields'})


const Field = mongoose.model('Field', FieldSchema)
module.exports = Field