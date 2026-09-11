import { createSlice } from "@reduxjs/toolkit";

const locationSourceSlice = createSlice({
  name: "locationSource",
  initialState: {
    source: "gps", // "gps" | "search"
  },
  reducers: {
    setLocationSource: (state, action) => {
      state.source = action.payload;
    },
  },
});

export const { setLocationSource } = locationSourceSlice.actions;

export default locationSourceSlice.reducer;
