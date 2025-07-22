import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./src/routes/auth.route.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

//  routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB()
    .then(() => console.log("Database connected successfully"))
    .catch((error) =>
      console.error("Database connection failed:", error.message)
    );
  console.log(`Server is running on port ${PORT}`);
});

// middleware for handling errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    status: false,
    statusCode,
    message,
  });
});
