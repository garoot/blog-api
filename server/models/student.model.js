const mongoose = require('mongoose');
const {Schema} = mongoose;

const StudentSchema = new Schema({
    firstName: String,
    lastName: String,
    country: String,
    bio: String,
    birthDate: Date,
    profilePic: String,
    country: {
        type: String,
        required: [true, "this field is required"]
    },
    gender: {
        type: String,
        required: [true, "this field is required"]
    },
    username: {
        type: String,
        lowercase: true, 
        unique: true,
        required: [true, "this field is required"],
        match: [/^[a-zA-Z0-9]+$/, 'username is invalid'],
        index: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "email is required"],
        match: [/\S+@\S+\.\S+/, 'email is invalid'],
        index: true,
        unique: [true, "email is already used"]
    },
    phoneNumber: {
        type: String,
        required: [true, "this field is required"]
    },
    savedBlogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    readBlogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    enrollments: [{
        type: Schema.Types.ObjectId,
        ref: 'Enrollment'
    }],
    hash: String,
    salt: String,

}, {timestamps:true, collection:'students'});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;