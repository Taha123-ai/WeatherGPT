import { configureStore } from "@reduxjs/toolkit";
import userlocationreducer from "./locationslice";
import forecastreducer from "./ForecastSlice";
import userreducer from "./UserSlice";
import userselectlocation from "./Selectedlocslice";
import locationSourceReducer from "./locationSourceSlice"

const store = configureStore({
  reducer: {
    user: userreducer,
    userlocation: userlocationreducer,
    selectedlocation: userselectlocation,
    locationSource: locationSourceReducer,
    forecastslice: forecastreducer,
  },
});
export default store;
