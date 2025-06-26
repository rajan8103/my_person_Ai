import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "AiChatBot",
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
export default connectDb;
