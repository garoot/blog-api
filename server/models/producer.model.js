const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProducerSchema = new Schema({
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
    password: {
        type: String,
        required: [true, "password is required"]
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
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }],
    hash: String,
    salt: String,
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    // producer part
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }],

}, {timestamps:true, collection:'producers'});

const Producer = mongoose.model('Producer', ProducerSchema);
module.exports = Producer;