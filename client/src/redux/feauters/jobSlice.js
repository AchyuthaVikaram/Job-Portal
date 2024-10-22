
import { createSlice } from "@reduxjs/toolkit";
const initialState={alljobs:[]};
export const jobSlice=createSlice({
    name:"job",
    initialState,
    reducers:{
        setAllJobs:(state,action)=>{
            state.alljobs=action.payload;
        }
    }
})

export const {setAllJobs} = jobSlice.actions;
export default  jobSlice.reducer;  //export reducer to store.js
