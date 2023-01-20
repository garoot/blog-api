const User = require("../models/user.model")
const Blog = require("../models/blog.model")
const savedBlog = require("../models/savedBlog.model")

module.exports.saveBlog = async (req, res) => {
    // first check if provided user and blog exist in db
    // ...oops! no need for this, because verifyToken does the check
    {
        // already checked by authJWT.verifyToken()
            // await User.exists({_id: req.userId}, (err, user) => {
            //     if(err){
            //         console.log("User doesn't exist in db")
            //     } else if(user){
            //         console.log("User exists in db!")
            //     }
            // })
        await Blog.exists({_id: req.body.blog}, (err, blog) => {
            if(err){
                console.log("Blog doesn't exist in db!")
                res.json({message:"Blog doesn't exist in db!"})
            } else {
                console.log("Blog exists in db!")
            }
        })
        // console.log(allCheck)
        // if(!allCheck){
        //     res.json({message: "Either blog or user don't exists in db."})
        // }
    }
    this.createSavedBlog(req, res)
}

module.exports.createSavedBlog = (req, res) => {

    savedBlog.find({user: req.userId, blog:req.body.blog}, (err, savedBlogs)=>{
        if(err){console.log("this blog never been saved by this user before! GREAT")}
        // if blog already saved by student
        else if(savedBlogs.length > 0){
            res.json({message: "Blog already saved!"})
        // else create new savedBlog with given user and blog
        } else if (savedBlogs.length == 0){
            // res.json({message: "let's create a new savedBlog"})
            console.log("Let's create a new savedBlog")
            const newSavedBlog = new savedBlog({
                user: req.userId,
                blog: req.body.blog
            })
            newSavedBlog.save(err=>{
                if(err){res.json({error:err})}
                else{
                    res.json({message:"Blog saved successfully!"})
                }
            })
        } 
    })
}

module.exports.unsaveBlog = (req, res) => {
    savedBlog.find({user: req.userId, blog: req.body.blog}, (err, savedBlog) =>{
        if(err){res.json({error:err})}
        else if(savedBlog.length == 0){
            res.json({message: "savedBlog not found"})
        } 
        else if(savedBlog.length > 0){
            savedBlog[0].remove()
            res.json({message: "blog has been unsaved!"})
        }
    })
}

// for admin use, by blog ID
module.exports.getSavedBlogs = (req, res) => {
    if(!req.body.blog){
        res.json({message: "must send blog id in request"})
    }
    else {
        savedBlog.find({blog: req.body.blog}, (err, savedBlogs) => {
            if(err){res.json({error:err})}
            else{
                res.json({numBlogs: savedBlogs.length})
            }
            
        })
    }

}

module.exports.getAllSavedBlogs = (req, res) => {
    savedBlog.find()
        .then(savedBlogs => {
            res.json({savedBlogs: savedBlogs})
        })
        .catch(err => {
            res.json({error:err})
        })
}