const userMOdel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const redis = require('../config/cache');
async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Token not providing"
        })
    }
    const isBlacklisted = await redis.get(token);
    if (isBlacklisted) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );
        req.user = decoded
         next();
}  catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
   
}

module.exports = {authUser};