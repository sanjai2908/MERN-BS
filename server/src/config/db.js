import mongoose from "mongoose";

// ------------------------------------------------------------
// 🧩 MongoDB Connection Function
// ------------------------------------------------------------
export const connectDB = async (uri) => {
  try {
    if (!uri) {
      console.error("❌ MongoDB URI is missing! Please check your .env file.");
      process.exit(1);
    }

    // ✅ Connect to MongoDB
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Optional: Handle connection errors after initial connect
    mongoose.connection.on("error", (err) => {
      console.error("⚠️ MongoDB connection error:", err.message);
    });

    // Optional: Handle disconnects gracefully
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected. Trying to reconnect...");
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
