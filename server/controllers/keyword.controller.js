const Keyword = require('../models/keyword.model')
const Course = require('../models/course.model')
const Blog = require('../models/blog.model')

module.exports.addBlog = (req, res) => {
    Keyword.findById({_id: req.body.keyword}, (err, keyword) => {
        if(err){res.json({error: err})}
        else if(keyword.blogs.includes(req.body.blog)){
            res.json({
                message: "blog already covered by this keyword",
                keyword: keyword
            })
        } else {
            keyword.blogs.push(req.body.blog)
            keyword.save(err=>{
                if(err){res.json({error:err})}
                else{res.json({
                    message:"blog added successfully to keyword.fields", 
                    keyword: keyword
                })}
            })
        }
    })
}

module.exports.addCourse = (req, res) => {
    Keyword.findById({_id: req.body.keyword}, (err, keyword) => {
        if(err){res.json({error: err})}
        else if(keyword.courses.includes(req.body.course)){
            res.json({
                message: "course already covered by this keyword",
                keyword: keyword
            })
        } else {
            keyword.courses.push(req.body.course)
            keyword.save(err=>{
                if(err){res.json({error:err})}
                else{res.json({
                    message:"course added successfully to keyword.fields", 
                    keyword: keyword
                })}
            })
        }
    })
}

module.exports.getKeywords = (req, res) => {
    Keyword.find()
        // .populate('blogs')
        // .populate('courses')
        // .populate('fields')
        .then(data => {
            res.status(200).json({
                message: "Keywords received successfully",
                keywords: data
            })
        })
}

module.exports.postKeyword = (req, res) => {
    const keyword = new Keyword({
        name: req.body.name,
        icon: req.file.filename,
    })
    keyword.save(err => {
        if(err) {
            // the name here refers to 
            // the keyword.name attribute
            if (err.errors.name.kind == 'unique'){
                err.errors.name.message = "this keyword already exists!"
                console.log(err.errors.name.message)
            }
            res.send(err.errors.name)
        }
        else {
            res.send('keyword added')
        }
    })
}

// module.exports.getCoursesByKeyword = (req, res) => {
//     Course.find()
// }