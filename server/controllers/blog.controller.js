const Blog = require('../models/blog.model')
const Producer = require('../models/producer.model')

module.exports.getBlogs = (req,res) => {
    Blog.find()
        .populate('producer')
        .then(data => {
            res.status(200).json({
                message: "Blogs received successfully",
                blogs: data
            })
        })
}

module.exports.postBlog = (req, res) => {
    // subject to change depending on front-end requirements
    // console.log(req.body.producer)
    // const producer = new Producer({})
    // Producer.findOne({firstName: "Ali"})
    // .then(result => 
    //     producer = result
    // )
    // .catch(err => console.log({err}))
    // console.log(producer)
    const title = req.body.title
    const headline = req.body.headline
    const content = req.body.content
    const profilePic = req.body.profilePic
    // only needs to take produce._id 
    // shouldn't be a string when entered in front-end
    const producer = req.body.producer
    const blog = new Blog({
        title: title,
        headline: headline,
        content: content,
        profilePic: profilePic,
        producer: producer
    })
    blog.save(err => {
        if(err) { res.send(err)}
        else { res.send('blog added!')}
    });
    console.log(blog.id)
    // making sure new blog is added to the producer's list of created blogs
    Producer.findOneAndUpdate(
        {_id: producer}, 
        {$push: {blogs: blog}}
        )
        .then(data => {
            console.log(data);
        })
}
