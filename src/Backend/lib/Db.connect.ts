import mongoose from "mongoose";
import dotenv from 'dotenv';
import DATABASE_NAME from "./Db.Name";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

dotenv.config();

async function connectToDatabase(): Promise<void> {
  if (connection.isConnected) {
    return;
  }
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not defined");
  }
  if (!process.env.DATABASE_NAME) {
    throw new Error("DB_NAME not defined");
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DATABASE_NAME,
    });
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw new Error("Failed to connect to MongoDB");
  }
}

export default connectToDatabase;