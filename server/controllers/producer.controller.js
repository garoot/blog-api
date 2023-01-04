
const Producer = require('../models/producer.model')

module.exports.postProducer = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const headline = req.body.headline;
    const bio = req.body.bio;
    const birthDate = req.body.birthDate;
    const profilePic = req.body.profilePic;
    const country = req.body.country;
    const gender = req.body.gender;
    const username = req.body.username;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const producer = new Producer({
        firstName: firstName,
        lastName: lastName,
        headline: req.body.headline,
        bio: bio,
        birthDate: birthDate,
        profilePic: profilePic,
        country: country,
        gender: gender,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
    })
    producer.save(err =>{
        if(err) { res.send(err)}
        else {res.send('producer created')}
    })
}

module.exports.getProducers = (req, res) => {
    Producer.find()
        .populate('blogs')
        .then(data => {
            res.status(200).json({
                message: "Producers received successfully",
                producers: data
            })
        })
}
