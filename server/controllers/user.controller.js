const User = require('../models/user.model')
const Course = require('../models/course.model')
const Blog = require('../models/blog.model')
var bcrypt = require("bcryptjs");

// TESTING FUNCTIONS

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.")
}
exports.userBoard = (req, res) => {
    res.stauts(200).send("User Content.")
}
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.")
}
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.")
}

// 
module.exports.getMyInfo = (req, res) => {
    User.findById({_id: req.userId}, (err, user) => {
        if(err){res.json({error:err})}
        else {
            res.status(200).json({
                message: `${user.username}'s info has been retrieved successfully!`,
                user: user,
                pic: user.profilePic
            })
        }
    })

}

module.exports.getUsers = (req, res) => {
    User.find()
        .populate('enrollments')
        // .populate('savedBlogs')
        .then(data => {
            res.status(200).json({
                message: "Users received successfully",
                users: data
            })
        })
        .catch(err => {
            if(err){res.json({error:err})}
        })
}

module.exports.postUser = (req, res) => {
    // console.log(req.body.username)
    console.log(req.body)
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
        birthDate: req.body.birthDate,
        profilePic: req.file.filename,
        country: req.body.country,
        gender: req.body.gender,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    user.save(err =>{
        if(err) { res.send(err)}
        else {res.send('user created')}
    })
}

module.exports.addToWishlist = (req, res) => {
    // adjust to: _id: req.userId
    User.findById({_id: req.body.user}, 
        (err, user) => {
            if(err){res.json({error:err})}
            else if(! user.wishlist.includes(req.body.course)){
                user.wishlist.push(req.body.course)
                user.save(err=>{
                    if(err){res.json({error:err})}
                    else{
                        res.status(201).json({
                            message: "Course added to wishlist!"
                        })
                    }
                })
            } else {
                res.json({
                    message: "course already in wishlist!"
                })
            }
        }
    )
    Course.findById({_id:req.body.course}, 
        (err, course) => {
            if(err){res.json({error:err})}
            // if user didn't already favoured the course...
            else if(! course.wishlistedBy.includes(req.body.user)){
                course.wishlistedBy.push(req.body.user)
                course.save(err => {
                    if(err){res.json({error:err})}
                    else{res.status(201).json({
                        message: "user added successfully"
                    })}
                })
            } else {
                console.log("user has already added the course to wishlist")
            }
        }   
    )
}


module.exports.saveBlog = (req, res) => {
    // retrieving blog to save "saving/bookmarking user" in it
    // this can be important to list all users interested in certain topic/keyword
    Blog.findById(
        {_id: req.body.blog},
        (err, blog) => {
            if(err){ res.json({
                error:err,
                })
            }
            else if(!blog){
                console.log("Blog not found")
                // res.json({message: "Blog not found"})
            }
            // if blog not saved by user before...store user in blog.usersSaved
            else if( !blog.usersSaved.includes(req.body.user)){
                blog.usersSaved.push(req.body.user)
                blog.save(err => {
                    if(err){ res.json({error:err})}
                    else { console.log("user is saved in blog.usersSaved")}
                })
                // console.log(blog)
            // else.. user read it before..don't store user
            } else { console.log("user saved blog already!")}
        console.log(blog)
    })
    User.findById(
        {_id: req.body.user},
        (err, user) => {
            if(err) {res.json({error:err})}
            // if blog doesn't exists in savedBlogs... save
            else if(! user.savedBlogs.includes(req.body.blog)) {
                user.savedBlogs.push(req.body.blog)
                user.save(err => {
                    if(err) {
                        res.json({error:err})
                    }
                    else {
                        res.send("blog has been saved!")
                    }
                });
                console.log(user)
            }
            // else nothing
            else{
                res.send("blog already saved!")
            }
        console.log(user)
    })
}
