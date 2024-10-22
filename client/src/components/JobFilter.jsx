import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch } from "react-redux";
import { setIndustry, setLocation, setSalary } from "../redux/feauters/jobFilter";


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

	// Handler to dispatch actions based on the filter type
	const handleFilterChange = (filterType, value) => {
		switch (filterType) {
			case "Location":
				dispatch(setLocation(value));
				break;
			case "Industry":
				dispatch(setIndustry(value));
				break;
			case "Salary":
				dispatch(setSalary(value));
				break;
			default:
				break;
		}
	};

	return (
		<div className="m-0 p-0">
			<h1 className="text-xl">Filter Jobs</h1>
			<hr className="mt-3"></hr>
			{filters.map((data, idx) => {
				return (
					<div key={idx} className="mt-2">
						<FormControl>
							<FormLabel id="demo-row-radio-buttons-group-label">
								<h1>{data.filterType}</h1>
							</FormLabel>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								name="row-radio-buttons-group"
								onChange={(e) => handleFilterChange(data.filterType, e.target.value)} // Handle change here
							>
								<div className="grid grid-col-2">
									{data.values.map((val, i) => (
										<FormControlLabel
											key={i}
											value={val}
											control={<Radio />}
											label={val}
										/>
									))}
								</div>
							</RadioGroup>
						</FormControl>
					</div>
				);
			})}
		</div>
	);
}

export default JobFilter;
