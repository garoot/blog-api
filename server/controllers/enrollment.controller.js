const Enrollment = require('../models/enrollment.model')

module.exports.getAllEnrollments = (req, res) => {
    Enrollment.find()
        // .populate('student')
        .then(data => {
            res.status(200).json({
                message: "Enrollments received successfully",
                enrollments: data
            })
        })
        .catch(err => {
            res.json({
                message: "Error",
                error: err
            })
        })
}

module.exports.getEnrollmentsByCourse = (req, res) => {
    Enrollment.find({course: req.body.course})
        .then(enrollments => {
            if(enrollments.length > 0){
                res.json([{numOfEnrollments: enrollments.length},
                    {enrollments: enrollments}])
            }
            else if(enrollments.length == 0 ){
                res.json({message: "No enrollment for this course yet!"})
            }
        })
        .catch(err => {
            res.json({error:err})
        })
}

module.exports.getMyEnrollments = (req, res) => {
    Enrollment.find({user: req.userId}, (err, enrollments) => {
        if(err){res.json({error:err})}
        else if(enrollments.length > 0){
            res.json({
                enrollments: enrollments
            })
        }
        else if(enrollments.length == 0){
            res.json({message: "User not enrolled in any course yet!"})
        }
    })
}