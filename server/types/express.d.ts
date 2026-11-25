import "express";

declare global {
  namespace Express {
    interface UserPayload {
      userId: string;
      userEmail: string;
      userRole: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};
