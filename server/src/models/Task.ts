import mongoose from "mongoose";

interface taskInterface {
  title: string;
  description: string;
  status: "pending" | "ongoing" | "completed";
  user: mongoose.Types.ObjectId;
}

export const taskSchema = new mongoose.Schema<taskInterface>(
  {
    title: {
      type: String,
      required: [true, "Title is requured"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is requured"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model<taskInterface>("Task", taskSchema);
export default Task;
