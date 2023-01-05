const blogPicDIR = './public/blogPics'
const {v4: uuidv4} = require('uuid')
let multer = require('multer');


const blogPicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, blogPicDIR)
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, uuidv4() + '_' + filename)
    }
})

var upload = multer({
    storage: blogPicStorage,
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