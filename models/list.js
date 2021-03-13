const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const listSchema = new Schema ({
    category: String,
    films: String,
})

module.exports = mongoose.model("List", listSchema)