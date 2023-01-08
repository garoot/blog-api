const mongoose = require('mongoose');
const {Schema} = mongoose;

const CourseSchema = new Schema({
    title: {
        type: String,
        required: [ true, "must enter a title for your course!"]
    },
    description: {
        type: String,
        required: [true, "Describe shortly what your course is about"]
    },
    producer: {
        type: Schema.Types.ObjectId,
        ref: "Producer",
        required: [true, "you must assign a producer for this course"]
    },
    courseLength: Number,
    numLessons: Number,
    numQuizzes: Number,
    outcomes: Array,
    rating: Number,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    requirements: Array,
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }],
    keywords: [{
        type: Schema.Types.ObjectId,
        ref: "Keyword"
    }],
    target: [{
        type: Schema.Types.ObjectId,
        ref: "Target"
    }],
    enrollments: [{
        type: Schema.Types.ObjectId,
        ref: "Enrollment"
    }],
    wishlistedBy: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }],
    courseLanguage: String,
    pricing: Number,
    usedUnits: Number

}, {timestamps: true, collection: 'courses'})

const Course = mongoose.model('Course', CourseSchema)
module.exports = Course;