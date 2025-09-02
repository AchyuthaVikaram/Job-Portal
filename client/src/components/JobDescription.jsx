import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { APPLICATION_END_POINT, JOB_END_POINT, USER_END_POINT } from "../utils/constant";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFlashMessage } from "../utils/flashMessageContext";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function JobDescription() {
	const user = useSelector((store) => store.auth.user);
	const navigate = useNavigate();
	const params = useParams();
	const jobId = params.id;
	const [job, setJob] = useState(null);
	const [isApplied, setIsApplied] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [saving, setSaving] = useState(false);
	const { showMessage } = useFlashMessage();

	useEffect(() => {
		const fetchSingleJob = async () => {
			try {
				const res = await axios.get(`${JOB_END_POINT}/get/${jobId}`, {
					withCredentials: true,
				});
				if (res.data.success) {
					setJob(res.data.job);
					// Only check if applied when user is logged in
					if (user) {
						setIsApplied(
							res.data.job.applications.some(
								(application) => application.applicant._id === user._id
							)
						);
					}
				}
			} catch (error) {
				console.log("Error fetching job details:", error);
				// Handle error gracefully - job details should still be accessible
			}
		};

		const checkIfSaved = async () => {
			if (user) {
				try {
					const res = await axios.get(`${USER_END_POINT}/saved-jobs`, {
						withCredentials: true,
					});
					if (res.data.success) {
						const savedJobIds = res.data.savedJobs.map(job => job._id);
						setIsSaved(savedJobIds.includes(jobId));
					}
				} catch (error) {
					console.log("Error checking saved status:", error);
				}
			}
		};

		fetchSingleJob();
		checkIfSaved();
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

	const handleSaveJob = async () => {
		if (!user) {
			showMessage("error", "Please login to save jobs");
			navigate('/login');
			return;
		}

		setSaving(true);
		try {
			if (isSaved) {
				// Unsave job
				const res = await axios.delete(`${USER_END_POINT}/unsave-job/${jobId}`, {
					withCredentials: true,
				});
				if (res.data.success) {
					setIsSaved(false);
					showMessage("success", "Job removed from saved jobs");
				}
			} else {
				// Save job
				const res = await axios.post(`${USER_END_POINT}/save-job/${jobId}`, {}, {
					withCredentials: true,
				});
				if (res.data.success) {
					setIsSaved(true);
					showMessage("success", "Job saved successfully");
				}
			}
		} catch (error) {
			console.log(error);
			if (error.response) {
				showMessage("error", error.response.data.message);
			} else {
				showMessage("error", "An unexpected error occurred.");
			}
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
				<div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
					<div className="flex-1">
						<h1 className="font-bold text-2xl md:text-3xl text-gray-900 mb-4">{job?.title}</h1>
						<div className="flex items-center gap-3 flex-wrap">
							<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
								{job?.position} Positions
							</span>
							<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
								{job?.jobType}
							</span>
							<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
								{job?.salary} LPA
							</span>
						</div>
					</div>
					<div className="flex-shrink-0 flex gap-3">
						{/* Save Button */}
						<Button
							className={`rounded-lg px-4 py-3 font-medium ${
								isSaved
									? "bg-yellow-500 hover:bg-yellow-600 text-black"
									: "bg-gray-100 hover:bg-gray-200 text-gray-700"
							}`}
							onClick={handleSaveJob}
							disabled={saving}
							startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
						>
							{saving ? "..." : (isSaved ? "Saved" : "Save")}
						</Button>

						{/* Apply Button */}
						{user ? (
							<Button
								className={`rounded-lg px-6 py-3 font-medium text-white ${
									isApplied
										? "bg-black cursor-not-allowed "
										: "bg-black hover:bg-purple-700 text-black"
								}`}
								disabled={isApplied}
								onClick={applyJobHandler}
							>
								{isApplied ? "Already Applied" : "Apply Now"}
							</Button>
						) : (
							<Button
								className="rounded-lg bg-black hover:bg-purple-700 text-white px-6 py-3 font-medium transition-colors duration-200"
								onClick={() => navigate('/login')}
							>
								Login to Apply
							</Button>
						)}
					</div>
				</div>
				
				<div className="mt-8 pt-6 border-t border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900 mb-6">Job Details</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-1">Role</h3>
								<p className="text-gray-700">{job?.title}</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-1">Location</h3>
								<p className="text-gray-700">{job?.location}</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-1">Experience</h3>
								<p className="text-gray-700">{job?.experience} years</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-1">Salary</h3>
								<p className="text-gray-700">{job?.salary} LPA</p>
							</div>
						</div>
						<div className="space-y-4">
							<div>
								<h3 className="font-semibold text-gray-900 mb-1">Total Applicants</h3>
								<p className="text-gray-700">{job?.applications?.length || 0}</p>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-1">Posted Date</h3>
								<p className="text-gray-700">{job?.createdAt?.split("T")[0]}</p>
							</div>
						</div>
					</div>
					<div className="mt-6">
						<h3 className="font-semibold text-gray-900 mb-2">Description</h3>
						<p className="text-gray-700 leading-relaxed">{job?.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default JobDescription;
