const categoryController = require('../controllers/category.controller');
const {upload} = require('../middleware/coursepic-fs')
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})


router
    .route('/')
    .get(categoryController.getCategories)
    .post(categoryController.postCategory)

module.exports = router