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
    .populate("enrollments")
}

module.exports.getUsers = (req, res) => {
    User.find()
        // .populate('enrollments')
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
            if(err){
                res.json({error:err})
            }
            else if(!user){
                res.json({message:"User not found in db"})
            }
            else if(user.wishlist.includes(req.body.course)){
                console.log("course already in Wish List")
            }
            else if(! user.wishlist.includes(req.body.course)){
                user.wishlist.push(req.body.course)
                user.save(err=>{
                    if(err){res.json({error:err})}
                    else{
                        console.log("Course has been added to wishlist!")
                    }
                })
            }
        }
    )
    Course.findById({_id:req.body.course}, 
        (err, course) => {
            if(err){res.json({error:err})}
            else if(!course){
                console.log("Course not found in db")
                res.json({message:"Course not found in db"})
            }
            // if user didn't already favoured the course...
            else if(! course.wishlistedBy.includes(req.body.user)){
                course.wishlistedBy.push(req.body.user)
                course.save(err => {
                    if(err){res.json({error:err})}
                    else{res.status(201).json({
                        message: "user added successfully"
                    })}
                })
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
            if(err){ res.json({error:err})
            }
            else if(!blog){
                // console.log("Blog not found")
                res.json({message: "Blog not found"})
            }
            else if(blog.usersSaved.includes(req.body.user)){
                res.json({message: "blog already saved!"})
            }
            // if blog not saved by user before...store user in blog.usersSaved
            else if( !blog.usersSaved.includes(req.body.user)){
                blog.usersSaved.push(req.body.user)
                blog.save(err => {
                    if(err){ res.json({error:err})}
                    else { console.log("User has been saved in blog.usersSaved")}
                })
                // console.log(blog)
            // else.. user read it before..don't store user
            } 
            // else { console.log("user saved blog already!")}
        // console.log(blog)
    })
    User.findById(
        {_id: req.body.user},
        (err, user) => {
            if(err) {console.log(err)}
            else if(!user){
                // console.log("user not found")
                res.json({message:"user not found"})
            }
            // if blog doesn't exists in savedBlogs... save
            else if(!user.savedBlogs.includes(req.body.blog)) {
                user.savedBlogs.push(req.body.blog)
                user.save(err => {
                    if(err) {
                        res.json({error:err})
                    }
                    else {
                        res.send("Blog has been saved!")
                    }
                });
                // console.log(user)
            }
            // else it's been saved already
            // else{
            //     res.json({message:"blog already saved!"})
            // }
        // console.log(user)
    })
}

module.exports.unsaveBlog = (req, res) => {
    User.findById(
        {_id: req.body.user},
        (err, user) => {
            if(err){
                res.json({error:err})
            }
            else if(user.savedBlogs.length < 1){
                res.json({message:"there's nothing in the user's savedBlogs list"})
            }
            else if(user.savedBlogs){
                for(let i = 0; i <= user.savedBlogs.length; i++){
                    if(user.savedBlogs[i] == req.body.blog){
                        user.savedBlogs.splice(i, 1)
                        user.save(err => {
                            if(err){res.json({error:err})}
                            else{
                                res.json({message: "blog removed successfully"})
                            }
                        })
                    } else if(user.savedBlogs[i] != req.body.blog && user.savedBlogs.length == i){
                        res.json({message:"blog isn't in savedBlogs"})
                    }
                }
            } 
        }
    )
}

module.exports.readBlog = (req, res) => {

    // retrieving blog to save "reading user" in it
    // this can be important to list all users interested in certain topic/keyword
    Blog.findById(
        {_id: req.body.blog},
        (err, blog) => {
            if(err) {
                // res.json({error:err})
                console.log(err)
            }
            // if blog not read by user before...store user in blog.usersRead
            else if(!blog){
                // console.log("blog is not found!")
                res.json({message:"Blog is not found!"})
            }
            else if(blog.usersRead.includes(req.body.user)){
                res.json({message: "user read this blog before"})
            }
            else if( !blog.usersRead.includes(req.body.user)){
                blog.usersRead.push(req.body.user)
                blog.save(err => {
                    if(err) {
                        // res.json({error:err})
                        console.log(err)
                    } else {
                        res.json({message:"user is saved in blog.usersRead"})
                    }
                })
                
            // else..either user read it before..don't store user
            // or user can't be found
            } 
            // else { return res.json({message:"user read blog before!"})}
        }

    )

    // retrieving user to save read blog in it
    User.findById(
        {_id: req.body.user},
        (err, user) => {
            if(err) {
                // console.log(err)
                res.json({error:err})
            }
            else if(!user){
                // console.log("user not found in db!")
                res.json({message:"user not found in db!"})
            }
            // cancelled this condition because it's syncronous with
            // the condition in Blog.find...()
            // else if(user.readBlogs.includes(req.body.blog)){
            //     res.json({message: "userr read the blog before"})
            // }
            // if blog doesn't exists in readBlogs... save
            else if(! user.readBlogs.includes(req.body.blog)) {
                user.readBlogs.push(req.body.blog)
                user.save(err => {
                    if(err) {
                        // console.log(err)
                        res.json({error:err})
                    }
                });
            }
        }
    )
}
