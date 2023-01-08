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

// has been added to student.controller.js instead
// module.exports.addStudentToWishlist = (req, res) => {
//     Course.findById({_id:req.body.course}, 
//         (err, course) => {
//             if(err){res.json({error:err})}
//             // if student didn't already favoured the course...
//             else if(! course.wishlistedBy.includes(req.body.student)){
//                 course.wishlistedBy.push(req.body.student)
//                 course.save(err => {
//                     if(err){res.json({error:err})}
//                     else{res.status(201).json({
//                         message: "student added successfully"
//                     })}
//                 })
//             } else {
//                 res.status(200).json({
//                     message: "student has already added the course to wishlist"
//                 })
//             }
//         }   
//     )
// }