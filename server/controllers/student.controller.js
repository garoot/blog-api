const Student = require('../models/student.model')
const Course = require('../models/course.model')

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
        else {res.send('student created')}
    })
}

module.exports.addToWishlist = (req, res) => {
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


