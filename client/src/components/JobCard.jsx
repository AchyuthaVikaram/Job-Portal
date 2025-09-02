import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_END_POINT } from "../utils/constant";
import { useFlashMessage } from "../utils/flashMessageContext";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function JobCard({ job }) {
	const navigate = useNavigate();
	const user = useSelector((store) => store.auth.user);
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
						setIsSaved(savedJobIds.includes(job._id));
					}
				} catch (error) {
					console.log("Error checking saved status:", error);
				}
			}
		};

		checkIfSaved();
	}, [job._id, user?._id]);

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
				const res = await axios.delete(`${USER_END_POINT}/unsave-job/${job._id}`, {
					withCredentials: true,
				});
				if (res.data.success) {
					setIsSaved(false);
					showMessage("success", "Job removed from saved jobs");
				}
			} else {
				// Save job
				const res = await axios.post(`${USER_END_POINT}/save-job/${job._id}`, {}, {
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

	const handleCardClick = () => {
		navigate(`/description/${job._id}`);
	};

	return (
		<Card
			sx={{
				minWidth: 275,
				"&:hover": { boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)" }, // Hover effect on Card
			}}
		>
			<CardContent>
				<div className="flex justify-between items-start mb-2">
					<Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
						{job?.company?.name}
					</Typography>
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
				<Typography variant="h5" component="div" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
					{job?.title}
				</Typography>
				<Typography sx={{ color: "text.secondary", mb: 1.5 }}>
					India,{job?.location}
				</Typography>
				<Typography variant="body2">
					{job?.description}
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
			<div className="p-2 pt-0 ">
				<Button
					size="small"
					sx={{
						color: "#1D4ED8",
						backgroundColor: "#d5d6e8",
						borderRadius: "1rem",
						padding: "0 10px",
						marginRight: "0.5rem",
						marginLeft: "1rem",
					}}
				>
					{job?.position} Positions
				</Button>
				<Button
					size="small"
					sx={{
						color: "#F83002",
						backgroundColor: "#d5d6e8",
						borderRadius: "1rem",
						padding: "0 10px",
						marginRight: "0.5rem",
					}}
				>
					{job?.salary} LPA
				</Button>
				<Button
					size="small"
					sx={{
						color: "#7209C7",
						backgroundColor: "#d5d6e8",
						borderRadius: "1rem",
						padding: "0 10px",
						marginRight: "0.5rem",
					}}
				>
					{job?.jobType}
				</Button>
			</div>
		</Card>
	);
}
