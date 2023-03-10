const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReceiptSchema = new Schema({

    // total amount for each enrollment.
    totalAmount: Number,

    receiptRef: String,

    enrollments: [{
        type: Schema.Types.ObjectId,
        ref: "Enrollment"
    }],

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

}, {timestamps: true, collection: 'receipts'})

const Receipt = mongoose.model('Receipt', ReceiptSchema)
module.exports = Receipt