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
    app.get("/all", studentController.allAccess)
    app.get("/user", [authJWT.verifyToken], studentController.userBoard)
    app.get("/mod", [authJWT.verifyToken, authJWT.isModerator], studentController.moderatorBoard)
    app.get("/admin", [authJWT.verifyToken, authJWT.isAdmin], studentController.adminBoard)
}
router
    .route('/')
    .get(studentController.getStudents)

    .post(upload.single('profilePic'),
        studentController.postStudent)

router  
    .route('/add-to-wishlist')
    .put(studentController.addToWishlist)
module.exports = router;