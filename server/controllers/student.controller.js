const Student = require('../models/student.model')
const Course = require('../models/course.model')

// TESTING FUNCTIONS

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.")
}
exports.userBoard = (req, res) => {
    res.stauts(200).send("User Content.")
}
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.")
}
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.")
}

// 
module.exports.getMyInfo = (req, res) => {
    Student.findById({_id: req.userId}, (err, student) => {
        if(err){res.json({error:err})}
        else {
            res.status(200).json({
                message: `${student.username}'s info has been retrieved successfully!`,
                student: student,
                pic: student.profilePic
            })
        }
    })

}

module.exports.getStudents = (req, res) => {
    Student.find()
        .populate('enrollments')
        // .populate('savedBlogs')
        .then(data => {
            res.status(200).json({
                message: "Students received successfully",
                students: data
            })
        })
}

module.exports.postStudent = (req, res) => {
    // console.log(req.body.username)
    console.log(req.body)
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
        password: req.body.password
    })
    student.save(err =>{
        if(err) { res.send(err)}
        else {res.send('student created')}
    })
}

module.exports.addToWishlist = (req, res) => {
    // adjust to: _id: req.userId
    Student.findById({_id: req.body.student}, 
        (err, student) => {
            if(err){res.json({error:err})}
            else if(! student.wishlist.includes(req.body.course)){
                student.wishlist.push(req.body.course)
                student.save(err=>{
                    if(err){res.json({error:err})}
                    else{
                        res.status(201).json({
                            message: "Course added to wishlist!"
                        })
                    }
                })
            } else {
                res.json({
                    message: "course already in wishlist!"
                })
            }
        }
    )
    Course.findById({_id:req.body.course}, 
        (err, course) => {
            if(err){res.json({error:err})}
            // if student didn't already favoured the course...
            else if(! course.wishlistedBy.includes(req.body.student)){
                course.wishlistedBy.push(req.body.student)
                course.save(err => {
                    if(err){res.json({error:err})}
                    else{res.status(201).json({
                        message: "student added successfully"
                    })}
                })
            } else {
                console.log("student has already added the course to wishlist")
            }
        }   
    )
}


