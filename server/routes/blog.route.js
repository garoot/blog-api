const blogController = require('../controllers/blog.controller');
const Blog = require('../models/blog.model');
const {storage, upload} = require('../middleware/filesystem')
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})

router
    .route('/')
    .get(blogController.getBlogs)

    .post(upload.single('profilePic'),
        blogController.postBlog)
module.exports = router
// module.exports = (app) => {
//     app.get('/blogs', blogController.getBlogs);

//     app.post('/blogs', upload.single('profilePic'),
//         blogController.postBlog);
    
//     app.delete('/blogs', (req, res) => {
//         const title = req.body.title
//         Blog.deleteOne({title: title}, (err, blog) => {
//             if(err) {
//                 res.send(err);
//             } else {
//                 res.send("blog deleted!");
//             }
//         })
//     })
// 
// 
// 
// }

module.exports = router;