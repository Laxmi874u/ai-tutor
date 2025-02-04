import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js"; 
import authRouter from './routes/authRouters.js';
import userRouter from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB().catch(error => {
  console.error("Database connection failed:", error);
  process.exit(1); // Exit if database connection fails
});

// Allowed Origins
const allowedOrigins = [
  "http://localhost:5174",
  process.env.FRONTEND_URL // Allow frontend URL from .env
];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Test Route or API Endpoints
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
}).on("error", (err) => {
  console.error("Server failed to start:", err);
});
