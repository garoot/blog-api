const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema({
    title: {
        type: String,
        unique: [true, "this category already exists!"]
    },
    iconPic: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }],
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }]
}, {timestamps: true, collection: 'categories'})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category