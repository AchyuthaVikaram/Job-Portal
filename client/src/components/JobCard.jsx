import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
	const navigate = useNavigate();
	return (
		<Card
			sx={{
				minWidth: 275,
				"&:hover": { boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)" }, // Hover effect on Card
			}}
			onClick={() => navigate(`/description/${job._id}`)}
		>
			<CardContent>
				<Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
					{job?.company?.name}
				</Typography>
				<Typography variant="h5" component="div">
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
