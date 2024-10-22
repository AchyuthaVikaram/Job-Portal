import { useDispatch, useSelector } from "react-redux";
import JobDisplay from "./JobDisplay";
import JobFilter from "./JobFilter";
import { useEffect, useState } from "react";
import axios from "axios";
import { JOB_END_POINT } from "../utils/constant";
import { resetFilters } from "../redux/feauters/jobFilter";

function Jobs() {
	const dispatch = useDispatch();
	const { location, industry, salary } = useSelector(
		(store) => store.jobFilter
	);
	const jobs = useSelector((store) => store.job.alljobs);

	const [filteredJobs, setFilteredJobs] = useState(jobs);

	// Build the keyword based on selected filters
	const buildKeyword = () => {
		let keyword = "";
		if (location) keyword += `${location}`;
		if (industry) keyword += `${industry}`;
		if (salary) keyword += `${salary}`;
		return keyword;
	};
	// Reset filters on component mount (i.e., page reload)
	useEffect(() => {
		dispatch(resetFilters()); // Reset the filters on page load
	}, [dispatch]);
	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const keyword =buildKeyword();
                
				const res = await axios.get(`${JOB_END_POINT}/get?keyword=${keyword}`, {
					withCredentials: true,
				});
				if (res.data.success) {
					setFilteredJobs(res.data.jobs);
				}
			} catch (e) {
				console.log(e);
			}
		};
		fetchJobs();
	}, [location, industry, salary, dispatch]);

	return (
		<div className="flex max-w-7xl mx-auto my-2 gap-5">
			<div className="hidden md:block">
				<JobFilter className=" max-w-xl  " />
			</div>
			<div className="flex-1">
				<div className="grid sm:grid-cols-1 md:grid-cols-3 gap-2 ">
					{filteredJobs.length == 0 ? (
						<span>No jobs Found</span>
					) : (
						filteredJobs.map((job, idx) => (
							<JobDisplay key={idx} job={job} style={{ width: "18rem" }} />
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default Jobs;

// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { resetFilters } from "../redux/feauters/jobFilter";
// import JobDisplay from "./JobDisplay";
// import JobFilter from "./JobFilter";
// import axios from "axios";
// import { JOB_END_POINT } from "../utils/constant";
// import { useEffect } from "react";

// function Jobs() {
// 	const dispatch = useDispatch();
// 	const { location, industry, salary } = useSelector((store) => store.jobFilter);
// 	const jobs = useSelector((store) => store.job.alljobs);

// 	const [filteredJobs, setFilteredJobs] = useState(jobs);
// 	const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility

// 	// Build the keyword based on selected filters
// 	const buildKeyword = () => {
// 		let keyword = "";
// 		if (location) keyword += `${location}`;
// 		if (industry) keyword += `${industry}`;
// 		if (salary) keyword += `${salary}`;
// 		return keyword;
// 	};

// 	// Reset filters on component mount (i.e., page reload)
// 	useEffect(() => {
// 		dispatch(resetFilters());
// 	}, [dispatch]);

// 	useEffect(() => {
// 		const fetchJobs = async () => {
// 			try {
// 				const keyword = buildKeyword();
// 				const res = await axios.get(`${JOB_END_POINT}/get?keyword=${keyword}`, {
// 					withCredentials: true,
// 				});
// 				if (res.data.success) {
// 					setFilteredJobs(res.data.jobs);
// 				}
// 			} catch (e) {
// 				console.log(e);
// 			}
// 		};
// 		fetchJobs();
// 	}, [location, industry, salary, dispatch]);

// 	const toggleFilters = () => {
// 		setShowFilters(!showFilters); // Toggle filter section visibility
// 	};

// 	return (
// 		<div className="max-w-7xl mx-auto my-2">
// 			{/* Add Filters Button */}
// 			<div className="flex justify-between items-center">
// 				<h2 className="text-lg font-bold">All Jobs</h2>
// 				<button
// 					className="text-sm text-blue-500 flex items-center gap-1"
// 					onClick={toggleFilters}
// 				>
// 					Add Filters <span>{showFilters ? "▲" : "▼"}</span> {/* Toggle arrow */}
// 				</button>
// 			</div>

// 			{/* Filter Section */}
// 			{showFilters && (
// 				<div className="my-4">
// 					<JobFilter className="sm:max-w-sm md:max-w-xl" />
// 				</div>
// 			)}

// 			{/* Jobs Section */}
// 			<div className="grid sm:grid-cols-1 md:grid-cols-3 gap-2">
// 				{filteredJobs.length === 0 ? (
// 					<span>No jobs Found</span>
// 				) : (
// 					filteredJobs.map((job, idx) => (
// 						<JobDisplay key={idx} job={job} style={{ width: "18rem" }} />
// 					))
// 				)}
// 			</div>
// 		</div>
// 	);
// }

// export default Jobs;
