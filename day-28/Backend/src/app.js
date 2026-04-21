const express = require("express");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user.model");

const app = express();
app.use(express.json());
app.use(cookieParser());


const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);



module.exports = app