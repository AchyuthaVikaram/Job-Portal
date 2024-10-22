import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function JobsTable({ allJobsByAdmin, setAllJobsByAdmin }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedJob, setSelectedJob] = React.useState(null);
	const input = useSelector((store) => store.filterJob.filterJob);
	const [filteredJobs, setFilterdJobs] = React.useState(allJobsByAdmin);

	React.useEffect(() => {
		if (input) {
			let filteredJobs = allJobsByAdmin.filter(
				(job) =>
					job?.title?.toLowerCase().includes(input.toLowerCase()) ||
					job?.company?.name.toLowerCase().includes(input.toLowerCase())
			);
			setFilterdJobs(filteredJobs);
		} else {
			setFilterdJobs(allJobsByAdmin); // Show all companies when input is empty
		}
	}, [input, allJobsByAdmin]);
	const handleClick = (event, job) => {
		setAnchorEl(event.currentTarget);
		setSelectedJob(job);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSelectedJob(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<>
			{allJobsByAdmin.length == 0 ? (
				<p className="text-center font-bold text-lg">
					You haven't posted any job till now
				</p>
			) : (
				<>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="companies table">
							<TableHead>
								<TableRow>
									<TableCell>Logo</TableCell>
									<TableCell align="center">Company Name</TableCell>
									<TableCell align="center">Role</TableCell>
									<TableCell align="center">Date</TableCell>
									<TableCell align="right">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredJobs.map((job) => (
									<TableRow
										key={job._id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell>
											<Avatar
												alt={job.company.name}
												src={job.company.logo || "default-logo.png"}
											/>
										</TableCell>
										<TableCell align="center">{job.company.name}</TableCell>
										<TableCell align="center">{job.title}</TableCell>
										<TableCell align="center">
											{new Date(job.createdAt).toLocaleDateString()}
										</TableCell>
										<TableCell align="right">
											<Button
												aria-describedby={id}
												variant="outlined"
												onClick={(event) => handleClick(event, job)}
												sx={{
													color: "black",
													border: "none",
													backgroundColor: "white",
												}}
											>
												<MoreHorizIcon />
											</Button>
											<Popover
												id={id}
												open={open}
												anchorEl={anchorEl}
												onClose={handleClose}
												anchorOrigin={{
													vertical: "bottom",
													horizontal: "left",
												}}
											>
												<Typography sx={{ p: 2 }}>
													<Link to={`/admin/jobs/${selectedJob?._id}`}>
														<div className="flex  items-center gap-2 cursor-pointer hover:opacity-100">
															<EditIcon
																sx={{
																	width: "20px",
																	marginRight: "0.25rem",
																	opacity: "0.7",
																	"&:hover": { opacity: "1" },
																}}
															/>
															<span>Edit</span>
														</div>
													</Link>
													<Link
														to={`/admin/jobs/${selectedJob?._id}/applicants`}
													>
														<div className="flex  items-center gap-2 cursor-pointer hover:opacity-100">
															<RemoveRedEyeIcon
																sx={{
																	width: "20px",
																	marginRight: "0.25rem",
																	opacity: "0.7",
																	"&:hover": { opacity: "1" },
																}}
															/>
															<span>Applicants</span>
														</div>
													</Link>
												</Typography>
											</Popover>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<p className="text-muted text-sm text-center m-4">
						A list of your recently posted jobs
					</p>{" "}
				</>
			)}
		</>
	);
}
