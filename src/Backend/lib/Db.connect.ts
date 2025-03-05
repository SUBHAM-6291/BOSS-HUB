import mongoose from "mongoose";
import dotenv from 'dotenv';
import DATABASE_NAME from '@/Backend/lib/Db.Name';

type ConnectionObject = {
  isConnected?: number;
};


const connection: ConnectionObject = {};

dotenv.config();

const connectToDatabase = async (): Promise<void> => {
  if (connection.isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not defined");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DATABASE_NAME.name 
    });
    
    connection.isConnected = db.connections[0].readyState;
    console.log(`MongoDB connected successfully to database: ${DATABASE_NAME}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectToDatabase;