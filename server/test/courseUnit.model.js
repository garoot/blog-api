
const courseUnits = [
    {
    course: "63b6d73c652bc548c154ee8d",
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
    course: "63b6f44d75d55997343cf2b5",
    used: false,
    price: 150,
    promoCode: "2022",
    discountAmount: 10,
    amountPaid: 140,
    tierClass: "Basic",
    prevEnrollment: null
    },
]

const student = "63b6f1a83f9f7e14814edfae"

const cloudReceipt = {
    totalAmount : 59+140,
    receiptRef: "2022Majeed",

}


module.exports = {courseUnits, student, cloudReceipt}