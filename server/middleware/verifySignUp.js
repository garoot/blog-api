/*  1. This middleware helps the SignUp process to check
    if provided email or username already exist

    2. It also helps SignUp process check if provided req.body.roles 
    actually exists in the set of roles we have in db
*/

// in models/index.js
const db = require("../models")
const ROLES = db.ROLES
const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
            if(err) {
                res.status(500).send({ message: err});
                return;
            }
            if(user){
                res.status(400).send({
                    message: "Username already exists"
                })
                return;
            }

            // Email
            User.findOne({
                email:req.body.email
            }).exec((err, user) => {
                if(err) {
                    res.status(500).send({
                        message: err
                    })
                }
                if(user) {
                    res.status(400).send({
                        message: "Email already exists!"
                    })
                }
                next();
            })
        })
}

checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Role ${req.body.roles[i]} does not exists`
                });
            }
        }
    }
    next()
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
}

module.exports = verifySignUp