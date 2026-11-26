import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { authState, userInterface } from "../../types/user";

const initialState: authState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<userInterface>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<userInterface>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
