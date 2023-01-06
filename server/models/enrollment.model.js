const mongoose = require('mongoose');
const {Schema} = mongoose;

// enrollment is separate from student and courses so
// we can easily track new enrollments and used enrollments 
// and receipts as well
const EnrollmentSchema = new Schema({
    // whether or not the course is purchased as used
    used: Boolean,
    // enrollment are activated after payment is successfully processed
    // and deactivated after resale
    active: Boolean,
    // original price
    price: Number,
    // will be integrated later with promo code system
    promoCode: String,
    // how much student saves
    discountAmount: Number,
    // how much student pays for this particular course
    amountPaid: Number,
    // Golden, Silver, Basic
    // is used, tierClass is automatically basic
    tierClass: String,
    receipt: {
        type: Schema.Types.ObjectId,
        ref: "Receipt"
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    }
    
}, {timestamps: true, collection: 'enrollments'})

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema)
module.exports = Enrollment