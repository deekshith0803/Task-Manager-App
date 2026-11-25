import mongoose from "mongoose";

interface userInterface {
  fullName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  status: boolean;
}

export const userSchema = new mongoose.Schema<userInterface>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is requured"],
      minLength: [2, "Full name contain at least 2 cheractor"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is requured"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is requured"],
      minLength: [6, "Password contain at least 6 cheractor"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<userInterface>("User", userSchema);
export default User;
