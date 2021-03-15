const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const filmSchema = new Schema ({ 
    title: String,
    releasedate: Number,
    runtime: Number,
    synopsis: String,
    attachment: {
        type: Schema.Types.ObjectId,
        ref: "List"
    },
    director: String,
    editor: String,
    cinematographer: String,
    writer: String,
    composer: String,
})

module.exports = mongoose.model("Film", listSchema)