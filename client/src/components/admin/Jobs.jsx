import * as  React from 'react';
import { TextField, Button } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {  JOB_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { setFilterJob } from "../../redux/feauters/filterJobSlice";
import JobsTable from './JobsTable';

function Jobs() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const companyId = searchParams.get('company');
	const [input,setInput]= useState("");
	const dispatch = useDispatch();

	const [allJobsByAdmin, setAllJobsByAdmin] = React.useState([]);
	const [companyName, setCompanyName] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const fetchAllJobs = async () => {
			setLoading(true);
			try {
				let endpoint = `${JOB_END_POINT}/admin/get`;
				
				// If company ID is present, fetch only that company's jobs
				if (companyId) {
					endpoint = `${JOB_END_POINT}/admin/get?company=${companyId}`;
				}
				
				const res = await axios.get(endpoint, {
					withCredentials: true,
				});
                if(res.data.success){
                    setAllJobsByAdmin(res.data.jobs);
                }
			} catch (e) {
				console.log(e);
			} finally {
				setLoading(false);
			}
		};

		// Fetch company name if company ID is present
		const fetchCompanyName = async () => {
			if (companyId) {
				try {
					const res = await axios.get(`${JOB_END_POINT}/company/${companyId}`, {
						withCredentials: true,
					});
					if (res.data.success) {
						setCompanyName(res.data.company?.name || '');
					}
				} catch (error) {
					console.error('Error fetching company details:', error);
					setCompanyName('');
				}
			} else {
				setCompanyName('');
			}
		};

		fetchCompanyName();
        fetchAllJobs();
	}, [companyId]);

	useEffect(()=>{
		dispatch(setFilterJob(input));
	},[input,dispatch])

	return (
		<div className="max-w-6xl mx-auto my-10">
			{/* Company Filter Header */}
			{companyName && (
				<div className="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-100">
					<h2 className="text-lg font-medium text-purple-800">
						Showing jobs from: <span className="font-semibold">{companyName}</span>
					</h2>
					<Button 
						variant="outlined" 
						size="small" 
						onClick={() => navigate('/admin/jobs')}
						className="mt-2"
					>
						View All Jobs
					</Button>
				</div>
			)}

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
			{loading ? (
				<p className="text-center">Loading jobs...</p>
			) : allJobsByAdmin ? (
				<JobsTable allJobsByAdmin={allJobsByAdmin} setAllJobsByAdmin={setAllJobsByAdmin}  />
			) : (
				<p className="text-center">No jobs found</p>
			)}
		</div>
	);
}

export default Jobs;
