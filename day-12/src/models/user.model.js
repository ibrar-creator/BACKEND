const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email:{
        type: String,
        unique: [true, "whit this email already user axiste"]
    },
    password: String
})

const usermodel = mongoose.model("users", userSchema)
module.exports = usermodel