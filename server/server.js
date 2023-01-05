require('./config/mongoose.config')
require('./models/producer.model')


const express = require('express')
const app = express()
// const mainRoute = require('./routes/main.route')
const blogRoute = require('./routes/blog.route')
const producerRoute = require('./routes/producer.route')
const keywordRoute =require('./routes/keyword.route')
const cors = require('cors')
app.use(cors())
app.use(express.json(), express.urlencoded({extended: true}))

// entry router before branching into subsequent routes
app.use('/blogs', blogRoute)
app.use('/producers', producerRoute)
app.use('/keywords', keywordRoute)

// assigning location for static files
app.use('/public/', express.static('public'))

// listening on port 8000
app.listen(8000, () => console.log('Server is connected on port 8000'))