
const userController = require('../controllers/user.controller');
const receiptController = require('../controllers/receipt.controller')
const savedBlogController = require('../controllers/savedBlog.controller')
const readBlogController = require('../controllers/readBlog.controller');
const wishlistController = require('../controllers/wishlist.controller')
const enrollmentController = require('../controllers/enrollment.controller')
const {upload} = require('../middleware/profilepic-fs')
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})
const {authJWT} = require("../middleware");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    })
    
    app.get("/test/all", userController.allAccess)
    app.get("/users", userController.getUsers)
    app.post("/users", upload.single('profilePic') ,userController.postUser)
    // READ get wishlists by course id (for Role: admin)
    app.get("/wishlists", [authJWT.verifyToken,  /* authJWT.isAdmin */], wishlistController.getWishlists)
    // READ get all wishlists (for Role: admin)
    app.get("/all-wishlists", [authJWT.verifyToken,  /* authJWT.isAdmin */], wishlistController.getAllWishlists)
    // UPDATE wishlist (for Role: user)
    app.post("/user/add-to-wishlist",[authJWT.verifyToken], wishlistController.addToWishlist)
    // READ get blogs by blog id (for Role: admin)
    app.get("/all-saved-blogs", [authJWT.verifyToken, /* authJWT.isAdmin */], savedBlogController.getAllSavedBlogs)
    // READ get all saved blogs (for Role: admin)
    app.get("/saved-blogs", [authJWT.verifyToken, /* authJWT.isAdmin */], savedBlogController.getSavedBlogs)
    // UPDATE saved blogs (for Role: user)
    app.put("/user/save-blog", [authJWT.verifyToken], savedBlogController.saveBlog )
    // DELETE saved blog (for Role: user)
    app.delete("/user/unsave-blog", [authJWT.verifyToken], savedBlogController.unsaveBlog )
    // GET get my read blogs (for Role: user)
    app.get("/user/my-read-blogs", [authJWT.verifyToken,], readBlogController.myReadBlogs )
    // UPDATE read blogs (for Role: user)
    app.post("/user/read-blog", [authJWT.verifyToken,], readBlogController.readBlog )
    // GET get all read blogs by blog id (for Role: admin)
    app.get("/read-blogs", [authJWT.verifyToken,  /* authJWT.isAdmin */], readBlogController.getReadBlogs)
    // GET get all read blogs (for Role: admin)
    app.get("/all-read-blogs", [authJWT.verifyToken,  /* authJWT.isAdmin */], readBlogController.getAllReadBlogs)
    // Purchase units/courses (for Role: user)
    app.post("/user/purchase", [authJWT.verifyToken,], receiptController.createNewReceipt)
    // GET get all enrollments (for Role: admin)
    app.get("/all-enrollments", [authJWT.verifyToken,  /* authJWT.isAdmin */], enrollmentController.getAllEnrollments)
    // GET get enrollments by course id (for Role: admin)
    app.get("/enrollments-by-course", [authJWT.verifyToken,  /* authJWT.isAdmin */], enrollmentController.getEnrollmentsByCourse)
    // GET get ally my enrollments by user id (for Role: user)
    app.get("/my-enrollments", [authJWT.verifyToken], enrollmentController.getMyEnrollments)

    app.get("/test/user", [authJWT.verifyToken], userController.userBoard)
    
    // retrieving the logged in user's information
    app.get("/user", [authJWT.verifyToken], userController.getMyInfo)
    app.get("/test/mod", [authJWT.verifyToken, authJWT.isModerator], userController.moderatorBoard)
    app.get("/test/admin", [authJWT.verifyToken, authJWT.isAdmin], userController.adminBoard)
}
// router
//     .route('/')
//     .get(userController.getUsers)

//     .post(upload.single('profilePic'),
//         userController.postUser)

// router  
//     .route('/add-to-wishlist')
//     .put(userController.addToWishlist)
// module.exports = router;