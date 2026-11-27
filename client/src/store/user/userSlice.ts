import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { authState, userInterface } from "../../types/user";

const initialState: authState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<userInterface>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    login: (state, action: PayloadAction<userInterface>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
