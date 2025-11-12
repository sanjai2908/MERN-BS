import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

// ✅ Start the server
const startServer = async () => {
  try {
    if (!MONGO_URI) {
      console.error("❌ MONGODB_URI not found in .env file!");
      process.exit(1);
    }

    // ✅ Connect to MongoDB
    await connectDB(MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    // ✅ Create and start the server
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    });

    // ✅ Handle server errors (like port already in use)
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use.`);
      } else {
        console.error("❌ Server Error:", err);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// ✅ Run the server function
startServer();
