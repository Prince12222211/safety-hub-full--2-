import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/safety-hub";
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // Don't exit in development, allow server to start even if DB fails
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

export default connectDB;