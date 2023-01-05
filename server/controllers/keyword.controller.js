const Keyword = require('../models/keyword.model')
const Course = require('../models/course.model')
const Blog = require('../models/blog.model')

module.exports.getKeywords = (req, res) => {
    Keyword.find()
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
        icon: req.body.icon,
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