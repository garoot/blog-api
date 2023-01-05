const keywordController = require('../controllers/keyword.controller');
const {upload} = require('../middleware/public-fs')
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})

router
    .route('/')
    // GET() function for route '/'
    .get(keywordController.getKeywords)
    // POST() function for route '/'
    .post(upload.single('icon'),
        keywordController.postKeyword)
module.exports = router;