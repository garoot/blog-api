const Blog = require('../models/blog.model')
const Producer = require('../models/producer.model')
const Student = require('../models/student.model')
const Keyword = require('../models/keyword.model')
const Comment = require('../models/comment.model')
const Category = require('../models/category.model')

module.exports.getBlogs = (req,res) => {
    Blog.find()
        // .populate({
        //     path: 'comments',
        //     populate: {
        //         path: 'creator',
        //         model: 'Student'
        //     }
        // })
        .populate('category')
        .then(data => {
            res.status(200).json({
                message: "Blogs received successfully",
                blogs: data
            })
        })
}

module.exports.postBlog = (req, res) => {
    // subject to change depending on front-end requirements
    // console.log(req.body.producer)
    // const producer = new Producer({})
    // Producer.findOne({firstName: "Ali"})
    // .then(result => 
    //     producer = result
    // )
    // .catch(err => console.log({err}))
    // console.log(producer)
    const title = req.body.title
    const headline = req.body.headline
    const content = req.body.content
    const blogPic = req.file.filename
    // only needs to take produce._id 
    // shouldn't be a string when entered in front-end
    const producer = req.body.producer
    const blog = new Blog({
        title: title,
        headline: headline,
        content: content,
        profilePic: profilePic,
        producer: producer
    })
    blog.save(err => {
        if(err) { res.send(err)}
        else { res.send('blog added!')}
    });
    console.log(blog.id)
    // making sure new blog is added to the producer's list of created blogs
    Producer.findOneAndUpdate(
        {_id: producer}, 
        {$push: {blogs: blog}}
        )
        .then(data => {
            console.log(data);
        })
}

module.exports.saveBlog = (req, res) => {
    console.log(req.body.student)
    console.log(req.body.blog)
    // retrieving blog to save "saving/bookmarking student" in it
    // this can be important to list all students interested in certain topic/keyword
    Blog.findById(
        {_id: req.body.blog},
        (err, blog) => {
            if(err){ console.log(err)}
            // if blog not saved by student before...store student in blog.studentsSaved
            else if( !blog.studentsSaved.includes(req.body.student)){
                blog.studentsSaved.push(req.body.student)
                blog.save(err => {
                    if(err){ res.send(err)}
                    else { console.log("student is saved in blog.studentsSaved")}
                })
                // console.log(blog)
            // else.. student read it before..don't store student
            } else { console.log("student saved blog already!")}
        console.log(blog)
    })
    Student.findById(
        {_id: req.body.student},
        (err, student) => {
            if(err) {
                console.log(err)
            }
            // if blog doesn't exists in savedBlogs... save
            else if(! student.savedBlogs.includes(req.body.blog)) {
                student.savedBlogs.push(req.body.blog)
                student.save(err => {
                    if(err) {
                        res.send(err)
                    }
                    else {
                        res.send("blog has been saved!")
                    }
                });
                console.log(student)
            }
            // else nothing
            else{
                res.send("blog already saved!")
            }
        console.log(student)
    })
}
module.exports.readBlog = (req, res) => {

    // retrieving blog to save "reading student" in it
    // this can be important to list all students interested in certain topic/keyword
    Blog.findById(
        {_id: req.body.blog},
        (err, blog) => {
            if(err){ console.log(err)}
            // if blog not read by student before...store student in blog.studentsRead
            else if( !blog.studentsRead.includes(req.body.student)){
                blog.studentsRead.push(req.body.student)
                blog.save(err => {
                    if(err){ res.send(err)}
                    else { console.log("student is saved in blog.studentsRead")}
                })
                console.log(blog)
            // else.. student read it before..don't store student
            } else { console.log("student read blog before!")}
        console.log(blog)
    })

    // retrieving student to save read blog in it
    Student.findById(
        {_id: req.body.student},
        (err, student) => {
            if(err) {
                console.log(err)
            }
            // if blog doesn't exists in savedBlogs... save
            else if(! student.readBlogs.includes(req.body.blog)) {
                student.readBlogs.push(req.body.blog)
                student.save(err => {
                    if(err) {
                        res.send(err)
                    }
                    else {
                        res.send("blog has been read!")
                    }
                });
                console.log(student)
            }
            // else nothing
            else{
                res.send("blog already read before!")
            }
        console.log(student)
    })
}

module.exports.addComment = (req, res) => {
    const comment = new Comment({
        creator: req.body.creator,
        blog: req.body.blog,
        text: req.body.comment
    })
    comment.save(err=>{
        if(err){res.json({error:err})}
        else{
            res.status(202).json({
                message:"comment created successfully!"
            })
        }
    })
    // linking comment with blog
    Blog.findById({_id: req.body.blog}, 
        (err, blog) => {
            if(err){console.log(err)}
            else{
                blog.comments.push(comment)
            }
            blog.save(err=>{
                if(err){console.log(err)}
                else{console.log("comment saved in blog successfully")}
            })
        }
    )
}

module.exports.addKeyword = (req, res) => {
    Blog.findById({_id: req.body.blog}, 
        (err, blog) => {
            if(err){res.json({error:err})}
            else {
                if (Array.isArray(req.body.keywords)){
                    req.body.keywords.map(keyword =>{
                        if(! blog.keywords.includes(keyword)){
                            blog.keywords.push(keyword)
                            // find keyword and add blog to it
                            Keyword.findById({_id: keyword}, 
                                (err, keyword) => {
                                    if(err){console.log(err)}
                                    else{
                                        keyword.blogs.push(blog)
                                    }
                                    keyword.save(err=>{
                                        if(err){console.log(err)}
                                        else{console.log("blog added to keyword")}
                                    })
                            })
                        } else {
                            res.send({
                                message: "keyword already added to blog"
                            })
                        }
                    })
                    blog.save(err => {
                        if(err){console.log(err)}
                        else {
                            console.log( "keywords added to blog successfully")
                        }
                    })
                } else {
                    res.json({message: "must pass array keywords[] in PUT request"})
                }
            }
    })
}

module.exports.addToCategory = (req,res) => {
    Blog.findById({_id: req.body.blog},
        (err, blog) => {
            if(err){res.json({error:err})}
            else {
                blog.category = req.body.category
            }
            blog.save(err => {
                if(err){console.log(err)}
                else{
                    res.status(201).json({
                        message: "blog is linked with category successfully",
                        blog: blog
                    })
                }
            })
        }
    )
    Category.findById({_id: req.body.category},
        (err, category) => {
            if(err){res.json({error:err})}
            else if(!category.blogs.includes(req.body.blog)){
                category.blogs.push(req.body.blog)
            }
            category.save(err=>{
                if(err){console.log(err)}
                else{
                    console.log("blog added in Category successfully")
                }
            })
        })
}
