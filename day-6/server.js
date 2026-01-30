require('dotenv').config()

const app = require('./src/app')
const mongoose = require("mongoose")
const  monogdb = require("./src/config/database")
monogdb()
app.listen(3000, ()=>{
    console.log('Server is runing on port 3000');
    
})