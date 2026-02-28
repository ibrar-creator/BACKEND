const express = require("express");
const userModel = require("../model/user.models")
const jwt = require("jsonwebtoken");
const authRouter = express.Router();


authRouter.use(express.json());
authRouter.post("/users", async(req, res)=>{
    const {user, email, password} = req.body
    const isUserExist = await userModel.findOne({email})
    if(isUserExist){
        return res.status(400).json({
            message: "User already exists"
        })
    }
    const userDoc = await userModel.create({
        user,
        email,
        password
        })

const token  = jwt.sign({
    id: userDoc._id,
        user: userDoc.user,
},
process.env.JWT_SECRET
)
res.cookie("jwt_token", token)
    res.status(200).json({
        message: "User Created",
        user: userDoc,
        token
    })
   
})
module.exports = authRouter