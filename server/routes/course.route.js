const courseController = require('../controllers/course.controller');
const {upload} = require('../middleware/coursepic-fs')
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})

router
    .route('/')
    .get(courseController.getCourses)

    .post(courseController.postCourse)
module.exports = router;