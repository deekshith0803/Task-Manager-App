import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaskItem, TaskState, TaskStatus } from "../../types/task";

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskItem[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<TaskItem>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<TaskItem>) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id,
      );
      if (index !== -1) state.tasks[index] = action.payload;
    },
    changeTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: TaskStatus }>,
    ) => {
      const task = state.tasks.find((task) => task._id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const {
  setTasks,
  addTask,
  editTask,
  changeTaskStatus,
  removeTask,
  clearTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
