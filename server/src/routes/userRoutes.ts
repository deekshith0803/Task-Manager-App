import express from "express";
import { login, logout, signup } from "../controllers/authController.js";

const userRoute = express.Router();

userRoute.post("/register", signup);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

export default userRoute;
