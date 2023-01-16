
const studentController = require('../controllers/student.controller');
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
    
    app.get("/test/all", studentController.allAccess)
    app.get("/students", studentController.getStudents)
    app.post("/students", upload.single('profilePic') ,studentController.postStudent)
    app.get("/test/user", [authJWT.verifyToken], studentController.userBoard)
    // retrieving the logged in student's information
    app.get("/student", [authJWT.verifyToken], studentController.getMyInfo)
    app.get("/test/mod", [authJWT.verifyToken, authJWT.isModerator], studentController.moderatorBoard)
    app.get("/test/admin", [authJWT.verifyToken, authJWT.isAdmin], studentController.adminBoard)
}
// router
//     .route('/')
//     .get(studentController.getStudents)

//     .post(upload.single('profilePic'),
//         studentController.postStudent)

// router  
//     .route('/add-to-wishlist')
//     .put(studentController.addToWishlist)
// module.exports = router;