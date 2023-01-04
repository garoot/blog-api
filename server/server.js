require('./config/mongoose.config')
require('./models/producer.model')


const express = require('express')
const app = express()
// const mainRoute = require('./routes/main.route')
const blogRoute = require('./routes/blog.route')
const producerRoute = require('./routes/producer.route')

const cors = require('cors')
app.use(cors())
app.use(express.json(), express.urlencoded({extended: true}))

app.use('/blogs', blogRoute)
app.use('/producers', producerRoute)
// const mainRoute = require('./routes/main.route')
app.use('/public/', express.static('public'))
// mainRoute(app)
app.listen(8000, () => console.log('Server is connected on port 8000'))