const mongoose = require('mongoose');
const {Schema} = mongoose;
// var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto')
// var jwt = require('jsonwebtoken')
// var secret = require('../config');

const ProducerSchema = new Schema({
    firstName: String,
    lastName: String,
    headline: String,
    bio: String,
    birthDate: Date,
    profilePic: String,
    hash: String,
    salt: String,
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
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],

}, {timestamps:true, collection:'producers'});

// adding setPassword() method to the model Producer
ProducerSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    // this hash takes 5 args: password, salt, 
    // no. of hashing times, 
    // length of hash, algorithm
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

// adding validPassword() method
ProducerSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash
}

// adding generateJWT() method
ProducerSchema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    // setting expiry date after 60 days
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

// adding toAuthJSON() method which gets the JSON representation of the user
ProducerSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        profilePic: this.profilePic
    };
};

const Producer = mongoose.model('Producer', ProducerSchema);
module.exports = Producer;