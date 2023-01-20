const User = require("../models/user.model")
const Course = require("../models/course.model")
const Wishlist = require("../models/wishlist.model")

module.exports.addToWishlist = async (req, res) => {
    // first check if course exists in db
    {
        await Course.exists({_id: req.body.course}, (err, course) => {
            if(err){res.json({message: "Course doesn't exist in db!"})}
            else{
                console.log("Course exists in db!")
            }
        })
    }
    this.createWishlist(req, res)
}

module.exports.createWishlist = (req, res) => {
    Wishlist.find({user: req.userId, course: req.body.course}, (err, wishlist) => {
        if(err){console.log("this course is not added to wishlist")}
        else if(wishlist.length > 0){
            res.json({message: "Course already in wishlist!"})
        }
        else if(wishlist.length == 0){
            console.log("Let's create a new wishlist document!")
            const newWishlist = new Wishlist({
                user: req.userId,
                course: req.body.course
            })
            newWishlist.save(err => {
                if(err){res.json({error:err})}
                else{
                    res.json({message: "Course added successfully to wishlist"})
                }
            })
        }
    })
}

// for admin user, by course ID
module.exports.getWishlists = (req, res) => {
    if(!req.body.course){
        res.json({message: "must send course id in request"})
    } else {
        Wishlist.find({course: req.body.course}, (err, wishlists) => {
            if(err){res.json({error:err})}
            else {
                res.json({numWishlists: wishlists.length})
            }
        })
    }

}


module.exports.getAllWishlists = (req, res) => {
    Wishlist.find()
    .then(wishlists => {
        res.json({wishlists: wishlists})
    })
    .catch(err => {
        res.json({error:err})
    })
}