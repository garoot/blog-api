const config = require("../config/auth.config")
const db = require("../models")
const {user: User, role: Role, refreshToken: RefreshToken} = db
const AccessToken = require('../models/accessToken.model')

// const User = db.user
// const Role = db.role

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const InvalidToken = require("../models/InvalidToken.model");

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

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

exports.signin = (req, res) => {
    console.log("sign in ...")
    var isEmail = validateEmail(req.body.username)
    let username;
    if(isEmail){
        console.log("username is an email address: ", req.body.username)
        username = User.findOne({
            email: req.body.username
        })
    } else {
        console.log("username is not an email address: ", req.body.username)
        username = User.findOne({
            username: req.body.username
        })
    }
    username.populate("roles", "-__v")
    .exec(async (err, user) => {
        if(err) {
            res.status(500).send({
                message: err
            })
        }
        // if no user found
        if(!user){
            return res.status(404).send({
                message: "user not found"
            })
        }
        // else validate password
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
        let token = jwt.sign({id:user.id, username: user.username}, config.secret, {
            expiresIn: config.jwtExpiration //24 hours
        })
        // and generate refresh token
        let refreshToken = await RefreshToken.createToken(user);
        
        // attach user roles in different format for security
        let authorities = []
        for(let i = 0; i < user.roles.length; i++){
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase())
        }

        // create AccessToken in db to track them and blacklist them later
        // will be used when refresh token before expiry of access token
        // also when logout users
        const accessToken = new AccessToken({
            token: refreshToken,
            user: user,
            accessToken: token
        })
        accessToken.save((err, storedAccessToken) => {
            if(err){
                res.status(500).send({
                    message: err
                })
            }
        })

        // send data and accessToken
        res.status(200).json({
            id: user._id,
            username: user.username,
            // email: user.email,
            // roles: authorities,
            accessToken: token,
            refreshToken: refreshToken,
        })
    })
}

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken} = req.body;

    if(requestToken == null){
        return res.status(403).json({
            message: "Refresh Token is required!"
        })
    }

    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken})
        
        if(!refreshToken){
            res.status(403).json({message: "Refresh token is not in database!"})
        }
        
        if(RefreshToken.verifyExpiration(refreshToken)){
            RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false}).exec();

            res.status(403).json({
                message: "Refresh token was expired. Please make a new sign-in request",
            });
        }

        console.log(refreshToken.user.toString())

        // retrieving the access token attached to the refresh token to blacklist it
        console.log("retrieving access token attached to refresh token...")
        let oldAccessToken = await AccessToken.findOne({token: requestToken})

        console.log("Access token attached to refresh token:", oldAccessToken)

        console.log("invalidating retrieved access token...")
        let invalidToken = new InvalidToken({
            token: oldAccessToken.token,
            user: oldAccessToken.user,
            accessToken: oldAccessToken.accessToken
        })
        invalidToken.save((err, invokedToken) => {
            if(err){
                console.log(err)
            }
            console.log("token invalidated: ", invokedToken)
        })

        let newAccessToken = jwt.sign(
            { id: refreshToken.user._id}, 
            config.secret,
            {expiresIn: config.jwtExpiration}
        );

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        })
    } catch (err) {
        return res.status(500).send({message: err})
    }
}

exports.findRefreshToken = async (req, res) =>{
    const { refreshToken: requestToken} = req.body;

    if(requestToken == null){
        return res.status(403).json({
            message: "Refresh Token is required!"
        })
    }
    try {
        let refreshTokenDB = await RefreshToken.findOne({ token: requestToken})
        console.log(refreshTokenDB)
    }
    catch (err) {
        return res.status(500).send({message: err})
    }
}