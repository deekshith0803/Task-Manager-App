import type { Request, Response } from "express";
import Task from "../models/Task.js";

export const createTask = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found",
      });
    }
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    const task = await Task.create({
      title,
      description,
      user: user?.userId,
    });

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task cannot created",
      });
    }

    res.status(201).json({
      success: true,
      message: "Task create successfully",
      task,
    });
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

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }

    const allTask = await Task.find({ user: user?.userId });

    if (!allTask) {
      return res.json({
        success: false,
        message: "No task was created yet.",
      });
    }

    res.status(200).json({
      success: true,
      allTask,
    });
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

export const updateTask = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found",
      });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: id,
        user: user?.userId,
      },
      {
        title,
        description,
        status,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task cannot be updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "task update Succesfuly",
      updatedTask,
    });
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

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found",
      });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      user: user?.userId,
    });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "task deleted successfully",
      deletedTask,
    });
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

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found",
      });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "New task status is required",
      });
    }

    const task = await Task.findOne({ _id: id, user: user.userId });

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task cannot find",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Status change successfully",
      task,
    });
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
