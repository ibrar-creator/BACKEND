const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require: [true, "username is require"],
        unique: true
    },
    email:{
     type: String,
     require: [true, "email is required"],
     unique: true
    },
    password: {
        type: String,
        require: [true, "password is required"],
        select: false
    }
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;