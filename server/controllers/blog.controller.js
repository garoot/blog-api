const Blog = require('../models/blog.model')

module.exports.getBlogs = (req,res) => {
    Blog.find()
        .then(data => {
            res.status(200).json({
                message: "Blogs received successfully",
                blogs: data
            })
        })
}

module.exports.postBlog = (req, res) => {
    const title = req.body.title
    const headline = req.body.headline
    const content = req.body.content
    const profilePic = req.body.profilePic
    const blog = new Blog({
        title: title,
        headline: headline,
        content: content,
        profilePic: profilePic,
    })
    blog.save(err => {
        if(err) { res.send(err);}
        else { res.send('blog added!'); }
    });
}
