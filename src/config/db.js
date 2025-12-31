import mongoose from "mongoose";

export const connectDB = async (url) => {
  if (!url) {
    throw new Error("MongoDB connection string (MONGODB_URI) is missing.");
  }
  return await mongoose.connect(url);
};
