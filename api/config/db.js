import mongoose from "mongoose";

export const connectDB = async () => {
  const connectionString = process.env.MONGODB_URL;
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(connectionString);

    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
  }
};
