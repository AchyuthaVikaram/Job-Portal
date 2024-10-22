import BookmarkIcon from "@mui/icons-material/Bookmark";
import Avatar from "@mui/joy/Avatar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function JobDisplay({ job }) {
	const jobId = job?._id;

	// Helper function to calculate days ago
	const daysAgoFunction = (mongodbTime) => {
		const createdAt = new Date(mongodbTime);
		const currentTime = new Date();
		const timeDifference = currentTime - createdAt;
		return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Converts to days
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.3 }}
			className="pl-3 py-3 rounded-md shadow-xl bg-white border border-gray-100"
		>
			<div className="flex items-center justify-between">
				<p className="text-muted">
					{daysAgoFunction(job?.createdAt) === 0
						? "Today"
						: `${daysAgoFunction(job?.createdAt)} days ago`}
				</p>
				<BookmarkIcon className="text-gray mr-3" />
			</div>

			<div className="flex items-center mx-3 mt-4 mb-3">
				<Avatar
					alt={job?.company?.name}
					src={job?.company?.logo || "default-logo.png"}
				/>
				<div className="px-3">
					<h2>{job?.company?.name}</h2>
					<p>India, {job?.location}</p>
				</div>
			</div>

			<div>
				<h1 className="font-bold text-xl">{job?.title}</h1>
				<p className="text-small text-muted my-3">{job?.description}</p>
			</div>

			<div className="flex">
				<Button
					size="small"
					sx={{
						color: "#1D4ED8",
						borderRadius: "1rem",
						padding: "0 10px",
						fontWeight: "600",
						marginRight: "0.5rem",
					}}
				>
					{job?.position} Positions
				</Button>
				<Button
					size="small"
					sx={{
						color: "#F83002",
						borderRadius: "1rem",
						fontWeight: "600",
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
						borderRadius: "1rem",
						fontWeight: "600",
						padding: "0 10px",
						marginRight: "0.5rem",
					}}
				>
					{job?.jobType}
				</Button>
			</div>

			<div className="mt-3">
				<Button
					sx={{
						backgroundColor: "#6A38C2",
						color: "white",
						textTransform: "none", // To ensure text is not uppercase
					}}
				>
					<Link
						to={`/description/${jobId}`}
						style={{ color: "white", textDecoration: "none" }} // Ensures link inherits button color
					>
						Details
					</Link>
				</Button>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<Button
					sx={{
						backgroundColor: "#6A38C2",
						color: "white",
						textTransform: "none",
					}}
				>
					Save for later
				</Button>
			</div>
		</motion.div>
	);
}

export default JobDisplay;
