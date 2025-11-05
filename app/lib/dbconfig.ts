// lib/dbconfig.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("❌ Missing MONGO_URI in .env file");
}

let isConnected = false; // track the connection

export default async function connectdb() {
  if (isConnected) {
    console.log("✅ Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
