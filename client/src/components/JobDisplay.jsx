import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Avatar from "@mui/joy/Avatar";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_END_POINT } from "../utils/constant";
import { useFlashMessage } from "../utils/flashMessageContext";

function JobDisplay({ job }) {
	const jobId = job?._id;
	const user = useSelector((store) => store.auth.user);
	const navigate = useNavigate();
	const { showMessage } = useFlashMessage();
	const [isSaved, setIsSaved] = useState(false);
	const [saving, setSaving] = useState(false);

	// Check if job is saved on component mount
	useEffect(() => {
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

		checkIfSaved();
	}, [jobId, user?._id]);

	const handleSaveJob = async (e) => {
		e.preventDefault(); // Prevent event bubbling
		e.stopPropagation(); // Prevent parent click events
		
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

	// Helper function to calculate days ago
	const daysAgoFunction = (mongodbTime) => {
		const createdAt = new Date(mongodbTime);
		const currentTime = new Date();
		const timeDifference = currentTime - createdAt;
		return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Converts to days
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
		>
			<div className="flex items-center justify-between mb-4">
				<span className="text-sm text-gray-500">
					{daysAgoFunction(job?.createdAt) === 0
						? "Today"
						: `${daysAgoFunction(job?.createdAt)} days ago`}
				</span>
				<button
					onClick={handleSaveJob}
					disabled={saving}
					className="text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors duration-200"
				>
					{isSaved ? (
						<BookmarkIcon className="text-yellow-500" />
					) : (
						<BookmarkBorderIcon />
					)}
				</button>
			</div>

			<div className="flex items-center mb-4">
				<Avatar
					alt={job?.company?.name}
					src={job?.company?.logo || "default-logo.png"}
					sx={{ width: 48, height: 48 }}
				/>
				<div className="ml-3">
					<h3 className="font-semibold text-gray-900">{job?.company?.name}</h3>
					<p className="text-sm text-gray-600">{job?.location}</p>
				</div>
			</div>

			<div className="mb-4">
				<h2 className="font-bold text-lg text-gray-900 mb-2">{job?.title}</h2>
				<p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
			</div>

			<div className="flex flex-wrap gap-2 mb-6">
				<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
					{job?.position} Positions
				</span>
				<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
					{job?.salary} LPA
				</span>
				<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
					{job?.jobType}
				</span>
			</div>

			<div className="flex flex-col sm:flex-row gap-3">
				<Link
					to={`/description/${jobId}`}
					className="flex-1"
				>
					<Button
						fullWidth
						variant="contained"
						sx={{
							backgroundColor: "#9333ea",
							'&:hover': {
								backgroundColor: "#7c3aed",
							},
							textTransform: "none",
							borderRadius: "8px",
							py: 1.5,
						}}
					>
						View Details
					</Button>
				</Link>
				<Button
					variant="outlined"
					onClick={handleSaveJob}
					disabled={saving}
					startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
					sx={{
						borderColor: isSaved ? "#f59e0b" : "#d1d5db",
						color: isSaved ? "#f59e0b" : "#6b7280",
						'&:hover': {
							borderColor: isSaved ? "#d97706" : "#9ca3af",
							backgroundColor: isSaved ? "#fef3c7" : "#f9fafb",
						},
						textTransform: "none",
						borderRadius: "8px",
						py: 1.5,
						minWidth: "120px",
					}}
				>
					{saving ? "..." : (isSaved ? "Saved" : "Save")}
				</Button>
			</div>
		</motion.div>
	);
}

export default JobDisplay;
