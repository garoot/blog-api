const Review = require('../models/review.model')
const Course = require('../models/course.model')
const Student = require('../models/user.model')

// retrieving reviews based on course id
module.exports.getReviewsForCourse = (req, res) => {
    Review.find({course: req.body.course})
        .then(data => {
            res.status(200).json({
                message: "reviews received successfully",
                reviews: data
            })
        })
        .catch(err => res.json({error: err}))
    // console.log(req.body.course)
    // const course = Course.findOne({title: "django course"})
    //     .then(data =>{
    //         console.log(data)
    //         res.status(200).json({
    //             message: "course received successfully",
    //             data: data
    //         })
    //     })
    //     .catch(err => res.json({error: err}))

}

module.exports.postReview = (req, res) => {
    const review = new Review({
        rating: req.body.rating,
        comment: req.body.comment,
        user: req.body.user,
        course: req.body.course
    })
    // adding review to course
    Course.findById(
        {_id: req.body.course},
        (err, course) => {
            if(err) {
                console.log(err)
            }
            else {
                course.reviews.push(review)
                course.save();
                console.log(course)
            }
    })
    // adding review to student
    Student.findById(
        {_id: req.body.student},
        (err, student) => {
            if(err) {
                console.log(err)
            }
            else {
                student.reviews.push(review)
                student.save();
                console.log(student)
            }
    })
    // saving new review
    review.save(err => {
        if(err) {
            res.send(err)
        }
        else {
            res.send("review created!")
        }
    })

}