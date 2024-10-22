import { createSlice } from "@reduxjs/toolkit";
const initialState={ 
    filterJob:"",
}

const filterJobSlice= createSlice({
    name:"filterJob",
    initialState,
    reducers:{
        setFilterJob:(state,action)=>{
        state.filterJob=action.payload;
       }
    }

})

export const {setFilterJob}= filterJobSlice.actions;
export default  filterJobSlice.reducer;  //export reducer to store.js