const fieldController = require('../controllers/field.controller');
const {upload} = require('../middleware/public-fs')
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})

router
    .route('/')
    .get(fieldController.getFields)
    .post(upload.single('iconPic'),
        fieldController.postField)

router
    .route('/add-course')
    .put(fieldController.addCourse)
router
    .route('/add-keyword')
    .put(fieldController.addKeyword)
module.exports = router