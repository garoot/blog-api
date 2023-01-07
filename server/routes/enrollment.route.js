const enrollmentController = require('../controllers/enrollment.controller');
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})

router
    .route('/')
    .get(enrollmentController.getEnrollments)

module.exports = router