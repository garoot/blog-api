const studentController = require('../controllers/student.controller');
const {upload} = require('../middleware/profilepic-fs')
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})

router
    .route('/')
    .get(studentController.getStudents)

    .post(upload.single('profilePic'),
        studentController.postStudent)
module.exports = router;