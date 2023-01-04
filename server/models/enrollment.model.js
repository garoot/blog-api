const mongoose = require('mongoose');
const {Schema} = mongoose;

const EnrolSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    price: Number,
    tierClass: String,
    receipt: {
        type: Schema.Types.ObjectId,
        ref: "Receipt"
    }
    
}, {timestamps: true, collection: 'enrollments'})

const Enrollment = mongoose.model('Enrollment', EnrolSchema)
module.exports = Enrollment