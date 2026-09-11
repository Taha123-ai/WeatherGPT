import { createSlice } from "@reduxjs/toolkit";

const ForecastSlice = createSlice({
  name: "forecast",
  initialState: {
    daily: null,
    current:null,
    todays24hrdata:null,
  },
  reducers: {
    setForecast: (state, action) => {
      state.daily = action.payload;
    },
    setcurrent: (state, action) => {
      state.current = action.payload;
    },
    settodays24hrdata:(state,action)=>{
      state.todays24hrdata =action.payload;
    },
    clearForecast: (state) => {
      state.daily = null;
    },
    clearcurrent: (state) => {
      state.current = null;
    },
    clearsettodays24hrdata: (state) => {
      state.todays24hrdata = null;
    },
  },
});

export const { setForecast, clearForecast,setcurrent,clearcurrent,settodays24hrdata ,clearsettodays24hrdata} = ForecastSlice.actions;
export default ForecastSlice.reducer;
