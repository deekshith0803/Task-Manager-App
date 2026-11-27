import express from "express";
import { getMe, login, logout, signup } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/token.js";

const userRoute = express.Router();

userRoute.post("/register", signup);
userRoute.post("/login", login);
userRoute.post("/logout", logout);
userRoute.get("/me", verifyToken, getMe);

export default userRoute;
