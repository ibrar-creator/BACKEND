const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user: String,
    email: {
        type: String,
        unique: [true, "Email must be unique"]
    },
    password: String
})
const useModel = mongoose.model("users", userSchema)
module.exports = useModel