require('./config/mongoose.config')
require('./models/producer.model')


const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// const mainRoute = require('./routes/main.route')
const blogRoute = require('./routes/blog.route')
const producerRoute = require('./routes/producer.route')
const studentRoute = require('./routes/student.route')
const courseRoute = require('./routes/course.route')
const keywordRoute =require('./routes/keyword.route')
const categoryRoute =require('./routes/category.route')
const fieldRoute =require('./routes/field.route')
const reviewRoute =require('./routes/review.route')
const receiptRoute =require('./routes/receipt.route')
const enrollmentRoute =require('./routes/enrollment.route')

const cors = require('cors')
app.use(cors())
app.use(express.json(), express.urlencoded({extended: true}))

// entry router before branching into subsequent routes
app.use('/blogs', blogRoute)
app.use('/producers', producerRoute)
app.use('/students', studentRoute)
app.use('/courses', courseRoute)
app.use('/keywords', keywordRoute)
app.use('/categories', categoryRoute)
app.use('/fields', fieldRoute)
app.use('/reviews', reviewRoute)
app.use('/receipts', receiptRoute)
app.use('/enrollments', enrollmentRoute)

// assigning location for static files
app.use('/public/', express.static('public'))

// listening on port 8000
app.listen(8000, () => console.log('Server is connected on port 8000'))