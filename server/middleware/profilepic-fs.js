const profilePicDIR = './public/profilePics'
const {v4: uuidv4} = require('uuid')
let multer = require('multer');


const profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profilePicDIR)
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-')
        req.body.profilePic = cb(null, uuidv4() + '_' + filename)
    }
})

var upload = multer({
    storage: profilePicStorage,
    limits: { fileSize:  401943040},
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "video/mp4" ) {
            cb(null, true) 
        } 
        else {
            // cb(null, false);
            req.body.MulterError = "File is not an image"
            return cb(new Error('Only .png, .jpg and .jpeg format allowed'))
        }
    }
})

module.exports = {upload}