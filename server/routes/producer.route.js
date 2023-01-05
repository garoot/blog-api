const producerController = require('../controllers/producer.controller');
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})
const {upload} = require('../middleware/profilepic-fs')

router
    .route('/')
    .get(producerController.getProducers)

    .post(upload.single('profilePic'),
        producerController.postProducer)
module.exports = router

// module.exports = (app) => {
//     app.get('/producers', producerController.getProducers);
//     // app.post('/producers', producerController.postProducer);
// }

