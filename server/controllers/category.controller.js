const Category = require('../models/category.model')

module.exports.getCategories = (req, res) => {
    Category.find()
        .then(data => {
            res.status(200).json({
                message: "Categories retrieved successfully",
                categories: data
            })
        })
        .catch(err => {
            res.json({error: err})
        })
}

module.exports.postCategory = (req, res) => {
    const title = req.body.title;

    const category = new Category({
        title: title,
    })

    category.save(err=>{
        if(err){res.json({error:err})}
        else{
            res.status(201).json({
                message: "category created successfully",
                category: category
            })
        }
    })
}

