import * as  React from 'react';
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {  JOB_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { setFilterJob } from "../../redux/feauters/filterJobSlice";
import JobsTable from './JobsTable';

function Jobs() {
	const navigate = useNavigate();
	const [input,setInput]= useState("");
	const dispatch = useDispatch();

	const [allJobsByAdmin, setAllJobsByAdmin] = React.useState([]);
	React.useEffect(() => {
		const fetchAllJobs = async () => {
			try {
				const res = await axios.get(`${JOB_END_POINT}/admin/get`, {
					withCredentials: true,
				});
                if(res.data.success){
                    setAllJobsByAdmin(res.data.jobs);
                }
			} catch (e) {
				console.log(e);
			}
		};
        fetchAllJobs();
	},[]);
	useEffect(()=>{
		dispatch(setFilterJob(input));
	},[input,dispatch])

	return (
		<div className="max-w-6xl mx-auto my-10">
			<div className="flex items-center justify-between my-5">
				<div style={{ width: "20%", height: "20px", padding: "1px 2px" }}>
					<TextField
						required
						id="job"
						name="job"
						type="text"
						variant="outlined"
						placeholder="Filter by job,role,company"
						fullWidth
						sx={{
							borderRadius: "1rem",
							"& fieldset": { borderRadius: "10px" },
							height: "40px",
							"& .MuiOutlinedInput-root": {
								height: "40px",
								"& input": {
									height: "40px",
									padding: "2px 14px",
								},
							},
						}}
						value={input}
						onChange={(e)=>setInput(e.target.value)}
					
					/>
				</div>
				<Button
					sx={{
						padding: "10px 20px",
						borderRadius: "10px",
						color: "white",
						backgroundColor: "#5b30a6",
					}}
					onClick={() => navigate("/admin/jobs/create")}
				>
					New Job
				</Button>
			</div>
			{allJobsByAdmin ? (
				<JobsTable allJobsByAdmin={allJobsByAdmin} setAllJobsByAdmin={setAllJobsByAdmin}  />
			) : (
				<p className="text-center">Loading jobs...</p>
			)}
		</div>
	);
}

export default Jobs;
