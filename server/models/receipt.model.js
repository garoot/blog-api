const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReceiptSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    price: Number,
    promoCode: String,
    discountAmount: Number,
    amountPaid: Number,
    enrollments: [{
        type: Schema.Types.ObjectId,
        ref: "Enrollment"
    }]
}, {timestamps: true, collection: 'receipts'})

