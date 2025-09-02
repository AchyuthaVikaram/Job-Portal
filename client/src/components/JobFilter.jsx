import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { setIndustry, setLocation, setSalary, resetFilters } from "../redux/feauters/jobFilter";


const filters = [
	{
		filterType: "Location",
		values: ["Hyderabad", "Bangalore", "Pune", "Chennai", "Delhi"],
	},
	{
		filterType: "Industry",
		values: [
			"Frontend Developer",
			"Backend Developer",
			"Full Stack Developer",
			"Data Science",
			"Graphic Designer",
		],
	},
	{
		filterType: "Salary",
		values: ["0-40k", "41k-1lac", "1lac-5lac"],
	},
];

function JobFilter() {
	const dispatch = useDispatch();
	const { location, industry, salary } = useSelector((store) => store.jobFilter);

	// Handler to dispatch actions based on the filter type
	const handleFilterChange = (filterType, value) => {
		// If the same value is selected again, clear the filter
		const currentValue = getCurrentFilterValue(filterType);
		const newValue = currentValue === value ? "" : value;
		
		switch (filterType) {
			case "Location":
				dispatch(setLocation(newValue));
				break;
			case "Industry":
				dispatch(setIndustry(newValue));
				break;
			case "Salary":
				dispatch(setSalary(newValue));
				break;
			default:
				break;
		}
	};

	// Helper function to get current filter value
	const getCurrentFilterValue = (filterType) => {
		switch (filterType) {
			case "Location":
				return location;
			case "Industry":
				return industry;
			case "Salary":
				return salary;
			default:
				return "";
		}
	};

	const clearAllFilters = () => {
		dispatch(resetFilters());
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-gray-900">Filter Jobs</h2>
				{(location || industry || salary) && (
					<button 
						onClick={clearAllFilters}
						className="text-sm text-purple-600 hover:text-purple-800 font-medium"
					>
						Clear All
					</button>
				)}
			</div>
			
			<div className="space-y-6">
				{filters.map((data, idx) => {
					return (
						<div key={idx}>
							<FormControl component="fieldset" className="w-full">
								<FormLabel component="legend" className="mb-3">
									<h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
										{data.filterType}
									</h3>
								</FormLabel>
								<RadioGroup
									aria-labelledby={`${data.filterType}-group-label`}
									name={`radio-group-${data.filterType}`}
									value={getCurrentFilterValue(data.filterType)}
									onChange={(e) => handleFilterChange(data.filterType, e.target.value)}
								>
									<div className="space-y-2">
										{data.values.map((val, i) => (
											<FormControlLabel
												key={i}
												value={val}
												control={
													<Radio 
														sx={{
															color: '#9ca3af',
															'&.Mui-checked': {
																color: '#9333ea',
															},
														}}
													/>
												}
												label={
													<span className="text-sm text-gray-700">
														{val}
													</span>
												}
												className="mx-0"
											/>
										))}
									</div>
								</RadioGroup>
							</FormControl>
							{idx < filters.length - 1 && (
								<div className="border-b border-gray-200 mt-6"></div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default JobFilter;
