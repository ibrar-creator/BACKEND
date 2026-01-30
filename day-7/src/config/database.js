const mongoose = require("mongoose")

function mongooseCt(){
    mongoose.connect(process.env.MODEL_URI)
    .then(()=>{
    console.log("Connect to ds sucsessfully");
     
        
    })
}
module.exports = mongooseCt