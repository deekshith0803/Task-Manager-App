import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../middlewares/token.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "user register successfully",
      user: {
        fullName,
        email,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.status) {
      return res.status(403).json({
        success: false,
        message: "Inactive user",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id.toString(), user.email, user.role);

    const { password: removePassword, ...userData } = user.toObject();

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        userData,
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.status(200).clearCookie("token").json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
