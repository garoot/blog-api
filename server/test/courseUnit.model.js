
const Course = require("../models/course.model")
const Student = require("../models/user.model")

const courseUnits = [
    {
    course: "63c79ce9098bb03473b230ce",
    used: true,
    price: 69,
    promoCode: "2022",
    discountAmount: 10,
    amountPaid: 59,
    tierClass: "Basic",
    prevEnrollment: "63b87046f94dd7d89dbb91ae",
    // to check if course's category is covered by promoCode
    category: "",
    field: ""
    },
    {
    course: "63c79ce9098bb03473b230ce",
    used: false,
    price: 150,
    promoCode: "2022",
    discountAmount: 10,
    amountPaid: 140,
    tierClass: "Basic",
    prevEnrollment: null
    },
]

const student = "63c7e7db07b5b4814080c609"

const cloudReceipt = {
    totalAmount : 59+140,
    receiptRef: "2022Majeed",

}


module.exports = {courseUnits, student, cloudReceipt}