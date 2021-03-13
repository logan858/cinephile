const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const listSchema = new Schema ({
    category: {
        type: String,
        enum: ["director", "cinematographer", "writer", "editor", "composer"]
    },
    name: String,
    images: String,
    quote: String,
})

const userSchema = new Schema ({
    username: String,
    email: String,
    avatar: String,
    googleId: String,
    directors: [listSchema],
    editors: [listSchema],
    cinematographers: [listSchema],
    writers: [listSchema],
    composers: [listSchema],
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)