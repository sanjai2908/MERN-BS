import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(morgan("dev"));

// ✅ Fix: CORS configuration for both local + Vercel
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-bs-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ API is healthy and running smoothly",
  });
});

app.use("/api/books", bookRoutes);

// ✅ Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
