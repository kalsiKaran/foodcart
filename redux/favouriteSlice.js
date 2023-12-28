import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favouriteList: [],
  },
  reducers: {
    handleFavourite: (state, action) => {
      const existingIndex = state.favouriteList.findIndex(
        (item) => item === action.payload
      );

      if (existingIndex !== -1) {
        state.favouriteList.splice(existingIndex, 1);
      } else {
        state.favouriteList.push(action.payload);
      }
    },
    reset: (state, action) => {
      state.favouriteList = [];
    },
  },
});

export const { handleFavourite, reset } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
