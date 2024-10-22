import { useSelector } from "react-redux";
import JobCard from "./JobCard";

function LatestJobs() {
	const jobs = useSelector((store) => store.job.alljobs);

	return (
		<div className="max-w-7xl mx-auto my-20">
			<h1 className="text-4xl font-bold">
				{" "}
				<span className="text-[#6A38C2]">Latest & Top</span> Job Openings
			</h1>
			<div className="grid  sm:grid-cols-1 md:grid-cols-3 gap-4 my-2 mt-3 ">
				{jobs?.length == 0 ? (
					<span>No jobs</span>
				) : (
					jobs
						?.slice(0, 6)
						.map((item, index) => <JobCard key={index} job={item} />)
				)}
			</div>
		</div>
	);
}

export default LatestJobs;
