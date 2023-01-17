
const userController = require('../controllers/user.controller');
const {upload} = require('../middleware/profilepic-fs')
const express = require('express')
// making sure we capture req.everything
const router = express.Router({mergeParams: true})
const {authJWT} = require("../middleware")

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
    app.put("/users/add-to-wishlist", userController.addToWishlist)
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