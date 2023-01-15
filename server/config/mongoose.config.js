const mongoose = require('mongoose');
const Role = require('../models/role.model');

mongoose.connect('mongodb://localhost/my_db', {
    useNewURLParser: true,
    useUnifiedTopology: true
})

.then(() => {
    console.log('Established a connection to the database')
    initial()
})
.catch(err => console.log('Something went wrong when connecting to the database', err));

// create 3 initial rows in Roles collection if nothing is there
function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if(err){
                    console.log("error", err)
                }
                console.log("added 'user' to roles collection")
            })

            new Role({
                name: "moderator"
            }).save(err => {
                if(err){
                    console.log("error", err)
                }
                console.log("added 'moderator' to roles collection")
            })

            new Role({
                name: "admin"
            }).save(err => {
                if(err){
                    console.log("error", err)
                }
                console.log("added 'admin' to roles collection")
            })
        }
    })
}
