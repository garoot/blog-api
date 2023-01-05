const Course = require('../models/course.model')

module.exports.getCourses = (req, res) => {
    Course.find()
        .then(data => {
            res.status(200).json({
                message: "Courses received successfully",
                courses: data
            })
        })
}

module.exports.postCourse = (req, res) => {
    console.log(req.formdata)
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        producer: req.body.producer
    })
    course.save(err => {
        if(err){
            res.send(err)
        }
        else {
            res.send("course created")
        }
    })
}