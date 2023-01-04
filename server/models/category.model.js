const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema({
    title: String
}, {timestamps: true, collection: 'categories'})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category