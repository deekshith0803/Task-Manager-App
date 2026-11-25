import type { NextFunction, Request, Response } from "express";
import Jwt, { type SignOptions } from "jsonwebtoken";

export const generateToken = (
  id: string,
  email: string,
  role: string,
): string => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT_SECRET_KEY is missing");
  }

  const userPayloafd = {
    userId: id,
    userEmail: email,
    userRole: role,
  };

  const options: SignOptions = {
    expiresIn: "7d",
  };

  const token = Jwt.sign(userPayloafd, secret, options);

  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is not loged in please login",
      });
    }

    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
      throw new Error("JWT_SECRET_KEY is not configured");
    }

    const decoded = Jwt.verify(token, secret);

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "string" ||
      typeof decoded.userEmail !== "string" ||
      typeof decoded.userRole !== "string"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    req.user = {
      userId: decoded.userId,
      userEmail: decoded.userEmail,
      userRole: decoded.userRole,
    };

    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Something wend wrong",
    });
  }
};
