const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userModel = require("./models/user.model");

const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);



module.exports = app