const mongoose = require("mongoose")
function monogdb(){
 
    mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
    console.log("Connect on database");
    
   })
}
module.exports = monogdb