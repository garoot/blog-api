const config = require("../config/auth.config")
const db = require("../models")
const User = db.user
const Role = db.role

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // new users
    const user = new User({
        username : req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
        birthDate: req.body.birthDate,
        profilePic: req.body.profilePic,
        country: req.body.country,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
    })
    user.save((err, user) => {
        if(err){
            res.status(500).send({
                message: err
            })
            return;
        }
        // find roles from db matching req.body.roles
        // and assigning one-to-many user --> db.roles 
        if(req.body.roles){
            Role.find({name: {$in: req.body.roles}}, (err, roles) => {
                if(err){
                    res.status(500).send({
                        message: err
                    })
                    
                }
                user.roles = roles.map(role => role._id);
                user.save(err => {
                    if(err){
                        res.status(500).send({
                            message: err
                        })
                    }
                    res.send({
                        message: "User was registered successfully!"
                    })
                })
            })
        // otherwise assign basic authority (user role) to new user
        } else {
            Role.findOne({name: "user"}, (err, role) => {
                if(err){
                    res.status(500).send({
                        message: err
                    })
                }
                user.roles = [role._id]
                user.save(err => {
                    if(err){
                        res.status(500).send({
                            message: err
                        })
                    }
                    res.send({
                        message: "User was registered successfully!"
                    })
                })
            })
        }
    })
}

exports.signin = (req, res) => {
    console.log("sign in ...")
    User.findOne({
        username: req.body.username
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
        if(err) {
            res.status(500).send({
                message: err
            })
            return;
        }
        // if no user found
        if(!user){
            return res.status(404).send({
                message: "user not found"
            })
        }
        // else validate password
        console.log(user)
        console.log(req.body.password)
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        // if not valid
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password!"
            })
        }
        // if valid, generate jwt token with attached data
        var token = jwt.sign({id:user.id, username: user.username}, config.secret, {
            expiresIn: 86400 //24 hours
        })
        // attach user roles in different format for security
        var authorities = []
        for(let i = 0; i < user.roles.length; i++){
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase())
        }
        // send data and accessToken
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        })
    })
}