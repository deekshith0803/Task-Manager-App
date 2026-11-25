// routes/taskRoute.ts
import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/token.js";

const taskRoute = express.Router();

taskRoute.use(verifyToken);

taskRoute.post("/create", createTask);
taskRoute.get("/all", getAllTasks);
taskRoute.put("/update/:id", updateTask);
taskRoute.patch("/update/:id/status", updateTaskStatus);
taskRoute.delete("/delete/:id", deleteTask);

export default taskRoute;
