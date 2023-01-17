const {verifySignUp} = require("../middleware")
const authController = require("../controllers/auth.controller")

module.exports = function(app) {
    // app.use() loads the middleware function before
    // the route to the /auth/signup or /auth/signin 
    app.use(function(req, res, next){
        console.log("pre res.header")
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        console.log("pre next()")
        // because this is a middleware that sets res.header and does not end the request-response cycle, 
        // it must call next() so req, res are passed to next middleware function. Otherwise, request will 
        // be left hanging
        next();
    })

    app.post(
        "/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        authController.signup
    )
    app.post("/auth/signin", authController.signin)
    app.post("/auth/refreshtoken", authController.refreshToken)
}