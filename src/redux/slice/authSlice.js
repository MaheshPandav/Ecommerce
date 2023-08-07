import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user-name"),
};
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleUserLogin: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem("user-name", user);
      localStorage.setItem("token", token);
    },
    handleUserLogout: (state) => {
      state.token = null;
      localStorage.removeItem("user-name");
      localStorage.removeItem("token");
    },
  },
});

export const { handleUserLogin, handleUserLogout } = authSlice.actions;

export default authSlice.reducer;
