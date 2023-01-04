const blogController = require('../controllers/blog.controller');
const Blog = require('../models/blog.model');
const DIR = './public'
const {v4: uuidv4} = require('uuid')
let multer = require('multer');
// var homepageRoute = require("./homepage.route")
const express = require('express')
// making sure we capture req.everything
let router = express.Router({mergeParams: true})
var producerRoute = require("./producer.route")
var blogRoute = require("./blog.route")

// module.exports = function(app){
//     // app.use("/", homepageRoute)
//     router.use("/:username/", blogRoute);
//     router.use("/:username/", producerRoute);
// }
router
    .route('/')
    .get(blogController.getBlogs)
module.exports = router