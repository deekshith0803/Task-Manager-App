import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongooseURI = process.env.MONGODB_URI;

    if (!mongooseURI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }
    const response = await mongoose.connect(mongooseURI);
    console.log(`mongoDB is connect to ${response.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed ${error}`);
  }
};
