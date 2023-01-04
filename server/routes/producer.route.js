const producerController = require('../controllers/producer.controller');
const Producer = require('../models/producer.model');
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})
const {storage, upload} = require('../middleware/filesystem')

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

