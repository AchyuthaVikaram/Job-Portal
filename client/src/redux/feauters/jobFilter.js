import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	location: "",
	industry: "",
	salary: "",
};

const jobFilter = createSlice({
	name: "jobFilter",
	initialState,
	reducers: {
		setLocation(state, action) {
			state.location = action.payload;
		},
		setIndustry(state, action) {
			state.industry = action.payload;
		},
		setSalary(state, action) {
			state.salary = action.payload;
		},
        resetFilters(state) {
			state.location = "";
			state.industry = "";
			state.salary = "";
		},
	},
});

export const {setIndustry,setLocation,setSalary,resetFilters}= jobFilter.actions;
export default jobFilter.reducer;  //export reducer for use in store