const mongoose = require("mongoose")

const InvalidTokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    accessToken: String,
});

const InvalidToken = mongoose.model("InvalidToken", InvalidTokenSchema);
module.exports = InvalidToken;