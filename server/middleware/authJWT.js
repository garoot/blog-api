const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js")
const db = require("../models")
const User = db.user
const Role = db.role

const {TokenExpiredError} = jwt

const catchError = (err, res) => {
    // if token is expired
    if(err instanceof TokenExpiredError){
        return res.status(401).send({
            message: "Unauthoriazed! Access Token was expired!"
        })
    }
    // else if token not verified AKA someone manipulated jwt token
    return res.sendStatus(401).send({
        message: "Unauthorized!"
    })
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        res.status(403).send({
            message: "No token provided!"
        })
    }
    // verify provided token's signature is legit
    jwt.verify(token, config.secret, (err, decoded) => {
        // if not legit, then someone manipulated the content of jwt token
        if(err) {
            return catchError(err, res)
        }
        req.userId = decoded.id;
        next();
    })
}

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err) {
            res.status(500).send({
                message: err
            })
            // return
        }
        Role.find({_id: {$in: user.roles}}, (err, roles) => {
            if(err) {
                res.status(500).send({
                    message: err
                })
                // return;
            }
            for(let i =0; i < roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    // return;
                }
            }

            res.status(403).send({
                message: "require admin role!"
            })
            // return;
        })
    })
}

isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({
                message: err
            })
            // return;
        }
        Role.find({_id: {$in: user.roles}}, (err, roles) =>{
            if(err){
                res.status(500).send({
                    message: err
                })
                // return
            }
            for(let i = 0; i< roles.length; i++){
                if(roles[i].name === "moderator"){
                    next();
                    // return;
                }
            }
            res.status(403).send({
                message: "required moderator role!"
            })
            // return
        })
    })
}

const authJWT = {
    verifyToken,
    isAdmin,
    isModerator
}

module.exports = authJWT