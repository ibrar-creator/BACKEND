const mongoose = require("mongoose")


const noteModel = new mongoose.Schema({
    title: String,
     description: String
})

module.exports =  mongoose.model("notes", noteModel)