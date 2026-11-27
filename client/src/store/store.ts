import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/userSlice";
import taskReducer from "./user/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
