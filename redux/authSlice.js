import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsloggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
  },
});

export const { setIsloggedIn } =
  authSlice.actions;
export default authSlice.reducer;
