import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// ------------------------------------------------------------
// 🧩 Global Middleware
// ------------------------------------------------------------

// ✅ Parse incoming JSON requests
app.use(express.json());

// ✅ Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ HTTP request logger
app.use(morgan("dev"));

// ------------------------------------------------------------
// 🚦 API Routes
// ------------------------------------------------------------

// ✅ Health Check (for testing API availability)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ API is healthy and running smoothly",
    environment: process.env.NODE_ENV || "development",
  });
});

// ✅ Book Routes (Main CRUD)
app.use("/api/books", bookRoutes);

// ------------------------------------------------------------
// ⚠️ Error Handling Middleware (keep at the end)
// ------------------------------------------------------------

// 404 - Not Found Handler
app.use(notFound);

// Custom Error Handler
app.use(errorHandler);

// ------------------------------------------------------------
// 🚀 Export Express App
// ------------------------------------------------------------
export default app;
