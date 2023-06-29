const mongoose = require("mongoose")

const AccessTokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    accessToken: String,
});

const AccessToken = mongoose.model("AccessToken", AccessTokenSchema);
module.exports = AccessToken;