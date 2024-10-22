import { useSelector } from "react-redux";
import JobDisplay from "./JobDisplay";
import axios from "axios";
import { useEffect, useState } from "react";
import { JOB_END_POINT } from "../utils/constant";


function Browse() {
	const query= useSelector(store=>store.query.query);
	const [jobs,setJobs]= useState([]);
	console.log(query);
	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const res = await axios.get(`${JOB_END_POINT}/get?keyword=${query}`, {
					withCredentials: true,
				});
				if (res.data.success) {
					// console.log(res);
					setJobs(res.data.jobs);
					
					// console.log("after useHook",jobs);
				}
			} catch (e) {
				console.log(e);
			}
		};
        fetchJobs();
	}, [query]);
	return (
		<div className="max-w-7xl mx-auto my-10 px-5 pb-5">
			<h1 className="text-xl text-muted my-4 font-bold">Seach Results ({jobs.length})</h1>
			<div className="grid  sm:grid-cols-1 md:grid-cols-3 gap-3">
				{jobs.map((item, indx) => (
					<JobDisplay key={indx} job={item} />
				))}
			</div>
		</div>
	);
}

export default Browse;
