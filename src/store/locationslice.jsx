import { createSlice } from "@reduxjs/toolkit";

const locationslice= createSlice({
    name:"userlocation",
    initialState:{
        longitude:null,
        latitude:null,
        status:"loading",
        location:null,
    },
    reducers:{
        addlongitude:(state,action)=>{
            state.longitude=action.payload;
        },
        addlatitude:(state,action)=>{
            state.latitude=action.payload;
        },
        addlocation:(state,action)=>{
            state.location=action.payload;
        },
        addstatus:(state,action)=>{
            state.status=action.payload;
        },
        clearlocationslice:(state)=>{
            state.location=null,
            state.longitude=null,
            state.latitude=null
            // state.status=null
        },
       
    }
})
export default locationslice.reducer;
export const {addlongitude,addlatitude,addlocation,clearlocationslice,addstatus}=locationslice.actions;