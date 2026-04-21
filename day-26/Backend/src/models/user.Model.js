
const monogoose = require('mongoose');



const userSchema = new monogoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique']
    },
    email:{
       type: String,
         required: [true, 'Email is required'],
            unique: [true, 'Email must be unique']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    }
})

const userModel = monogoose.model('User', userSchema);
module.exports = userModel;