const receiptController = require('../controllers/receipt.controller');
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})

router
    .route('/')
    // GET() for Review class based on course._id
    // .get(reviewController.getReviewsForCourse)
    // POST() for Review class 
    .post(receiptController.createNewReceipt)
module.exports = router;