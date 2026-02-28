const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const connectToDB = require("./config/database")
const authRouter = require("./routes/auth.routes")
connectToDB()

app.use(cookieParser())
app.use("/api", authRouter)

module.exports = app