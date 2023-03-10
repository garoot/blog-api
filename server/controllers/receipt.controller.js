const Enrollment = require('../models/enrollment.model')
const Student = require('../models/user.model')
const Course = require('../models/course.model')
const Receipt = require('../models/receipt.model')
// the process of buying courses (without promotion system)

// Step 1: student adds course/s to cart  
// Front-End:
// 1: a courseUnit is created for each added course to help attach "used: boolean" attribute
//   used/new courses with: course, used, price, promoCode, discountAmount, amountPaid, tierClass, prevEnrollment
// 2: promo checking with backend promo system API for each course (for Later)
// Back-End: none

// for testing: must create courseUnits[], student, and receiptul
const {courseUnits, student, cloudReceipt} = require('../test/courseUnit.model')

// Step 2: student pays successfully
// Front-End:
// 1: receipt is created with: 
//      totalAmount, receiptRef (to reference cloud receipts like Stripe)
// 2: courseUnits[] and student, and receipt are sent


// Back-End:
// 1: system creates receipt with:
//      totalAmount, student, enrollments, receiptRef (to reference cloud receipts like Stripe)
// 2: system creates enrollment for each courseUnit with: 
//      used, active, price, promoCode, discountAmount, amountPaid, tierClass
// 3: system links each enrollment to the course (enrollment.course = course._id)
// 4: system links each enrollment to the receipt (enrollment.receipt = receipt._id)
// 5: system links each enrollment to the student (enrollment.student = student._id)
// 6: find prevEnrollment and deactivate
// 7: system adds enrollment to receipt.enrollments[] 
// 8 (expensive): system adds each enrollment to course.enrollments[]
// 9: system adds each enrollment to student.enrollments[]
module.exports.createNewReceipt = async (req, res) => {
    // console.log("pre-entry")
    // console.log()
    // 1:
    const receipt = new Receipt({
        // should be  req.body.receipt.totalAmount
        // but for testing case...
        totalAmount: cloudReceipt.totalAmount,
        // should be req.body.receiptRef
        // but for testing case...
        receiptRef: cloudReceipt.receiptRef,
        // should be req.body.student
        // but for testing case...
        student: student,
    })
    // 2:
    //Assuming req.body.courseUnits[] is an array which each has most enrollment.attributes + course._id
    let enrollments = []
    // should be req.body.courseUnits.map(..)
    // but for testing only, we use courseUnits 
    // console.log(req.body.units)
    var alreadyEnrolled = false
    req.body.units.map(async unit =>{
        // if new unit, there's no prevEnrollment
        let _prevEnrollment = null
        if(unit.used){
            _prevEnrollment = unit.prevEnrollment
        }
        // 7: side-kick for 7:
        // checking if student already has active enrollment in any of the courseUnits
        await Enrollment.find({course: unit.course, student: unit.student, active: true})
        // 7: is student enrolled in any of the courseUnits        
        .then(enrollments => {
            if(enrollments){
                alreadyEnrolled = true
                console.log("1",alreadyEnrolled)
                res.json({message: "userr already enrolled"})
            }
        })
        .catch(err => {console.log(err)})
        

        // if not enrolled in any of the coursUnits
        console.log("2",alreadyEnrolled)
        if(!alreadyEnrolled){
            const enrollment = new Enrollment({
                used: unit.used,
                active: unit.active,
                price: unit.price,
                promoCode: unit.promoCode,
                discountAmount: unit.discountAmount,
                amountPaid: unit.amountPaid,
                tierClass: unit.tierClass,
                // 3:
                course: unit.course,
                // 4:
                receipt: receipt,
                // 5:
                // should be req.body.student
                // but for testing case...
                student: unit.student,
                prevEnrollment: _prevEnrollment
            })
            enrollment.save(err => {
                if(err){res.json({error:err})}
                else{
                    // console.log(enrollment)
                    console.log('enrollment created')
                }
            })
            // 6:
            // find the prevEnrollment to deactivate
            if(unit.used){
                Enrollment.findById({_id: enrollment.prevEnrollment}, (err, enrollment) => {
                    if(err){res.json({
                        error:err,
                        message: "prevEnrollment is invalid"
                    })}
                    else if(enrollment){
                        enrollment.active = false
                        enrollment.save(err => {
                            if(err){console.log(err)}
                            else{console.log("prevEnrollment deactivated successfully")}
                        })
                    }
                })
            }
            // 7:
            receipt.enrollments.push(enrollment)
            // to be concated with student.enrollment in step 8
            enrollments.push(enrollment)
            // 8:
            // this part can be expensive. Alternatively... 
            // since we're doing this to be able to list all students
            // enrolled in a course we can do this via Enrollment model 
            // ex: list all enrollments with courseID = id && active
            // Course.findById({_id: unit.course},  (err, course) => {
            //     if(err){ console.log(err)}
            //     else {
            //         course.enrollments.push(enrollment)
            //         course.save(err => {
            //             if(err){res.send(err)}
            //             else{res.send("enrollment added to a course")}
            //         })
            //     }
            // })
            receipt.save(err =>{
                if(err){res.json({error:err})}
                else{console.log("receipt created in backend successfully")}
            })
            // 9:
            // test cases:
            // student has enrollments, wants to add one enrollment
            // student has enrollments, wants to add array of new enrollments
            // should be _id: req.body.student
            // but for testing case... _id: student
            Student.findById({_id: unit.student},  (err, student) => {
                if(err){ console.log(err)}
                // LATER: if enrollment with same course._id active and exists, don't add
                // or BETTER: in front-end don't allow student to add a course he already enrolled in
                else {
                    student.enrollments.push(...enrollments)
                }
                student.save(err => {
                    if(err){console.log(err)}
                    else{console.log("saved student's enrollments")}
                })
            })
            res.json({message: "Enrollment created successfully!"})
            console.log("4",alreadyEnrolled)
            
            
        }
        
    })

}
module.exports.getReceipts = (req, res) => {
    Receipt.find()
        .then(data => {
            res.status(200).json({
                message: "receipts received successfully",
                receipts: data
            })
        })
        .catch(err => {
            res.send(err)
        })
}

