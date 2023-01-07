const Enrollment = require('../models/enrollment.model')

module.exports.getEnrollments = (req, res) => {
    Enrollment.find()
        .populate('prevEnrollment')
        .then(data => {
            res.status(200).json({
                message: "Enrollments received successfully",
                enrollments: data
            })
        })
        .catch(err => {
            res.send.status(401).json({
                message: "Error",
                error: err
            })
        })
}