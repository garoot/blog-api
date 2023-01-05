const Student = require('../models/student.model')


module.exports.getStudents = (req, res) => {
    Student.find()
        .populate('reviews')
        .then(data => {
            res.status(200).json({
                message: "Students received successfully",
                students: data
            })
        })
}

module.exports.postStudent = (req, res) => {
    
    const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
        birthDate: req.body.birthDate,
        profilePic: req.body.profilePic,
        country: req.body.country,
        gender: req.body.gender,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    })
    student.save(err =>{
        if(err) { res.send(err)}
        else {res.send('producer created')}
    })
}