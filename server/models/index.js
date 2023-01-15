const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;

db.user = require("./student.model")
db.role = require("./role.model")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db