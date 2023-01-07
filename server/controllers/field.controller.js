const Field = require('../models/field.model')


// this is for admin dshboard to add courses under any field
// requires attributes: field._id, course._id
module.exports.addCourse = (req, res) => {
    Field.findById({_id:req.body.field}, (err, field) => {
        if(err){console.log(err)}
        else if(field.courses.includes(req.body.course)){
            res.status(200).json({
                message: "course already added to field",
                field: field
            })
        } else {
            field.courses.push(req.body.course)
        }
        field.save(err => {
            if(err){res.json({
                error: err
            })}
            else{
                res.status(200).json({
                    message: "course added successfully to field",
                    field: field
                })
            }
        })
    })
}

module.exports.addKeyword = (req, res) => {
    Field.findById({_id:req.body.field}, (err, field) => {
        if(err){console.log(err)}
        else if(field.keywords.includes(req.body.keyword)){
            res.status(200).json({
                message: "keyword already added to field",
                field: field
            })
        } else {
            field.keywords.push(req.body.keyword)
        }
        field.save(err => {
            if(err){res.json({
                error: err
            })}
            else{
                res.status(200).json({
                    message: "keyword added successfully to field",
                    field: field
                })
            }
        })
    })
}

module.exports.getFields = (req, res) => {
    Field.find()
        .populate('courses')
        .populate('keywords')
        .then(data => {
            res.status(200).json({
                message: "fields received successfully",
                fields: data
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
}

module.exports.postField = (req, res) => {
    const field = new Field({
        name : req.body.name,
        iconPic : req.body.iconPic
    })

    field.save(err => {
        if(err){res.json({
            error: err
        })}
        else {
            res.status(201).json({
                message: "new field created successfully",
            })
        }
    })
}