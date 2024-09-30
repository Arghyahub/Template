import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB = process.env.DB;

// write a mongoose database connection function

export const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error.message);
  }
};
