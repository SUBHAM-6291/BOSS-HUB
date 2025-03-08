import mongoose from "mongoose";
import dotenv from 'dotenv';
import DATABASE_NAME from "./Db.Name";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

dotenv.config();

async function connectToDatabase(): Promise<void> {
  console.log("Attempting to connect to MongoDB...");

  if (connection.isConnected) {
    console.log("Already connected to MongoDB, state:", connection.isConnected);
    return;
  }

  console.log("Checking environment variables...");
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in .env");
    throw new Error("MONGODB_URI not defined");
  }
  if (!process.env.DATABASE_NAME) {
    console.error("DATABASE_NAME is not defined in .env");
    throw new Error("DB_NAME not defined");
  }
  console.log("Environment variables found:", {
    MONGODB_URI: "[hidden]",
    DATABASE_NAME: process.env.DATABASE_NAME,
  });

  try {
    console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI.replace(/\/\/.*@/, "//[credentials]@"));
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DATABASE_NAME,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully, state:", connection.isConnected);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export default connectToDatabase;