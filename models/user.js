const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: String,
    email: String,
    avatar: String,
    googleId: String,
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)