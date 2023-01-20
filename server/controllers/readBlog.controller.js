const ReadBlog = require("../models/readBlog.mode")
const Blog = require("../models/blog.model")
const User = require("../models/user.model")


module.exports.readBlog = async (req, res) => {
    // first check if user and blog exist
    // ...oops! no need to check user, because verifyToken does the check
    {
        await Blog.exists({_id: req.body.blog}, (err, blog) => {
            if(err){
                console.log("Blog doesn't exist in db!")
                res.json({message:"Blog doesn't exist in db!"})
            } else {
                console.log("Blog exists in db!")
            }
        })
    }
    this.createReadBlogs(req, res)
}

module.exports.createReadBlogs = (req, res) => {
    ReadBlog.find({user: req.userId, blog:req.body.blog}, (err, readBlogs) => {
        if(err){console.log("this blog has never been read by user")}
        else if(readBlogs.length > 0) {
            res.json({message: "Blog has been read before"})
        }
        else if(readBlogs.length == 0){
            console.log("Let's create a new readBlog")
            const newReadBlog = new ReadBlog({
                user: req.userId,
                blog: req.body.blog
            })
            newReadBlog.save(err => {
                if(err){res.json({error:err})}
                else{
                    res.json({message: "Blog added to a readBlog successfully!"})
                }
            })
        }
    })
}