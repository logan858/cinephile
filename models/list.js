const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema ({ 
    title: String,
    releasedate: Number,
    runtime: Number,
    synopsis: String,
    director: String,
    editor: String,
    cinematographer: String,
    writer: String,
    composer: String,
})

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
    },
    films: [filmSchema],
}, {
    timestamps: true
})

module.exports = mongoose.model("List", listSchema)