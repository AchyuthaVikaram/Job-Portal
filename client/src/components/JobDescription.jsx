import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { APPLICATION_END_POINT, JOB_END_POINT } from "../utils/constant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFlashMessage } from "../utils/flashMessageContext";

function JobDescription() {
	const user = useSelector((store) => store.auth.user);
	const params = useParams();
	const jobId = params.id;
	const [job, setJob] = useState(null);
	const [isApplied, setIsApplied] = useState(false);
	const { showMessage } = useFlashMessage();

	useEffect(() => {
		const fetchSingleJob = async () => {
			try {
				const res = await axios.get(`${JOB_END_POINT}/get/${jobId}`, {
					withCredentials: true,
				});
				if (res.data.success) {
					setJob(res.data.job);
					setIsApplied(
						res.data.job.applications.some(
							(application) => application.applicant._id === user?._id
						)
					);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchSingleJob();
	}, [jobId, user?._id]);

	const applyJobHandler = async () => {
		try {
			const res = await axios.get(`${APPLICATION_END_POINT}/apply/${jobId}`, {
				withCredentials: true,
			});
			if (res.data.success) {
				setIsApplied(true);
				const newJob = {
					...job,
					applications: [...job.applications, user._id],
				};
				setJob(newJob);
				showMessage("success", res.data.message);
			}
		} catch (error) {
			console.log(error);
			setIsApplied(false);
			if (error.response) {
				showMessage("error", error.response.data.message);
			} else {
				showMessage("error", "An unexpected error occurred.");
			}
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-10 pl-5 pb-5">
			<div className="flex  justify-between ">
				<div>
					<h1 className="font-bold text-xl">{job?.title}</h1>
					<div className="flex items-center gap-2 mt-4 flex-wrap">
						<Button
							className="text-blue-700 m-3 p-0 px-1"
							sx={{ borderRadius: "20rem", color: "blue" }}
							variant="ghost"
						>
							{job?.position} Positions
						</Button>
						<Button
							className="text-red-300 m-3 p-0 px-1"
							sx={{ borderRadius: "20rem", color: "#F83002" }}
							variant="ghost"
						>
							{job?.jobType}
						</Button>
						<Button
							className="text-blue-100 m-3 p-0 px-1"
							sx={{ borderRadius: "20rem", color: "#7209b7" }}
							variant="ghost"
						>
							{job?.salary} LPA
						</Button>
					</div>
				</div>
				<Button
					className={`rounded-lg ${
						isApplied
							? "bg-gray-600 cursor-not-allowed"
							: "bg-dark hover:bg-[#5f32ad] text-white"
					}`}
					disabled={isApplied}
					onClick={applyJobHandler}
				>
					{isApplied ? "Already Applied" : "Apply Now"}
				</Button>
			</div>
			<h1 className="border-b-2 border-b-gray-300 font-medium py-4">
				{job?.title}
			</h1>
			<div className="my-4">
				<h1 className="font-bold my-2">
					Role:{" "}
					<span className="pl-4 font-normal text-gray-800">{job?.title}</span>
				</h1>
				<h1 className="font-bold my-2">
					Location:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{job?.location}
					</span>
				</h1>
				<h1 className="font-bold my-2">
					Description:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{job?.description}
					</span>
				</h1>
				<h1 className="font-bold my-2">
					Experience:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{job?.experience} yrs
					</span>
				</h1>
				<h1 className="font-bold my-2">
					Salary:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{job?.salary} LPA
					</span>
				</h1>
				<h1 className="font-bold my-2">
					Total Applicants:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{job?.applications?.length}
					</span>
				</h1>
				<h1 className="font-bold my-2">
					Posted Date:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{job?.createdAt?.split("T")[0]}
					</span>
				</h1>
			</div>
		</div>
	);
}

export default JobDescription;
