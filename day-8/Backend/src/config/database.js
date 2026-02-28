const mongoose = require("mongoose");
function mongoosdb(){
 mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
   
console.log("connect MD sucsessfully");

   })
}


module.exports = mongoosdb