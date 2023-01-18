const Enrollment = require('../models/enrollment.model')

module.exports.getEnrollments = (req, res) => {
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