const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema({
    title: {
        type: String,
        unique: [true, "this category already exists!"]
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]
}, {timestamps: true, collection: 'categories'})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category