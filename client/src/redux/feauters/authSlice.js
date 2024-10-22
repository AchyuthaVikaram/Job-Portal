
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    user:null,
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        }
    }

})

export const {setUser,setLoading}= authSlice.actions;
export default  authSlice.reducer;  //export reducer to store.js









