const courseController = require('../controllers/course.controller');
const {upload} = require('../middleware/coursepic-fs')
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})

router
    .route('/')
    .get(courseController.getCourses)

    .post(upload.single('thumbnail'),
        courseController.postCourse)

router 
    .route('/find/:courseId')
    .get(courseController.getOneCourse)

router
    .route('/add-to-category')
    .put(courseController.addToCategory)

    module.exports = router;