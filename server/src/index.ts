import "dotenv/config";
import express from "express";
import userRoute from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import taskRoute from "./routes/taskRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

await connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/test", (req, res) => {
  res.send("task management is running");
});

app.use("/api", userRoute);
app.use("/api", taskRoute);

app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
});
