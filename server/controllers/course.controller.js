const Category = require('../models/category.model')
const Course = require('../models/course.model')

module.exports.getOneCourse = async (req, res) => {
    await Course.findOne({_id: req.params.courseId})
    .populate('producer')
    .then(data => {
        res.status(200).json({
            course: data,
        })
    })
    .catch(error => {
        res.status(400).json({
            error: error
        })
    })
}

module.exports.getCourses = (req, res) => {
    Course.find()
        .populate('producer')
        .then(data => {
            res.status(200).json({
                message: "Courses received successfully",
                courses: data
            })
        })
        .catch(error => {
            res.status(400).json({
                error:error
            })
        })
}

module.exports.postCourse = (req, res) => {
    // console.log(req.formdata)
    console.log(req.file.filename)
    const title = req.body.title;
    const description = req.body.description;
    const producer = req.body.producer;
    const pricing = req.body.pricing;
    const thumbnail = req.file.filename



    // let thumbnail = null;
    // if(req.file){
    //     thumbnail = req.file.filename
    // }
    const course = new Course({
        title: title,
        description: description,
        producer: producer,
        thumbnail: thumbnail,
        pricing: pricing
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

module.exports.addToCategory = (req, res) => {
    Course.findById({_id: req.body.course},
        (err, course) => {
            if(err){res.json({error:err})}
            else {
                course.category = req.body.category
            }
            course.save(err => {
                if(err){console.log(err)}
                else{
                    res.status(201).json({
                        message: "course is linked with category successfully",
                        course: course
                    })
                }
            })
        }
    )
    Category.findById({_id: req.body.category},
        (err, category) => {
            if(err){console.log(err)}
            else if(!category.courses.includes(req.body.course)){
                category.courses.push(req.body.course)
            }
            category.save(err=>{
                if(err){console.log(err)}
                else{
                    console.log("course added in Category successfully")
                }
            })
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