const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema ({
    category: {
        type: String,
        enum: ["director", "cinematographer", "writer", "editor", "composer"]
    },
    name: String,
    image: String,
    quote: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("List", listSchema)