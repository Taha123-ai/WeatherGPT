import { createSlice } from "@reduxjs/toolkit";

const UserSlice= createSlice({
    name:"user",
    initialState:{
        language:null
    },
    reducers:{
        addlanguage:(state,action)=>{
            state.language=action.payload;
        }
    }
})
export default UserSlice.reducer;
export const {addlanguage} =UserSlice.actions;