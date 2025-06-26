import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./Databse/db.js";
import cors from "cors";

const app = express();
//importing middlewares
app.use(express.json());
app.use(cors());
//imporing Routes
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

//using routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  connectDb();
});
