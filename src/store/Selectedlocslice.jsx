import { createSlice } from "@reduxjs/toolkit";

const Selectedlocslice = createSlice({
  name: "selectedslice",
  initialState: {
    longitude: null,
    latitude: null,
    location: null,
  },
  reducers: {
    addselectedlongitude: (state, action) => {
      state.longitude = action.payload;
    },
    addselectedlatitude: (state, action) => {
      state.latitude = action.payload;
    },
    addselectedlocation: (state, action) => {
      state.location ={city:action.payload};
    },
    clearselectedlocationslice: (state) => {
      ((state.location = null),
        (state.longitude = null),
        (state.latitude = null));
    },
    
  },
});
export default Selectedlocslice.reducer;
export const {addselectedlongitude,addselectedlatitude,addselectedlocation,clearselectedlocationslice} = Selectedlocslice.actions;
