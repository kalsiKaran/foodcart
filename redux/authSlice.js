import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userPoints: 0
  },
  reducers: {
    setIsloggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setPoints: (state, action) => {
      state.userPoints = action.payload
    },
  },
});

export const { setIsloggedIn, setPoints } =
  authSlice.actions;
export default authSlice.reducer;
