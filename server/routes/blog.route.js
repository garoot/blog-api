const blogController = require('../controllers/blog.controller');
const {upload} = require('../middleware/blogpic-fs')
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})

router
    .route('/')
    .get(blogController.getBlogs)

    .post(upload.single('blogPic'),
        blogController.postBlog)
// router
//     .route('/saveBlog')
//     .put(blogController.saveBlog)

router
    .route('/find/:blogId')
    .get(blogController.getOneBlog)

router
    .route('/readBlog')
    .put(blogController.readBlog)

router
    .route('/add-keyword')
    .put(blogController.addKeyword)

router
    .route('/add-comment')
    .put(blogController.addComment)

router
    .route('/add-to-category')
    .put(blogController.addToCategory)
module.exports = router;
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

