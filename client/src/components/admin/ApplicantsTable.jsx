import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { APPLICATION_END_POINT } from "../../utils/constant";
import axios from "axios";
import { useFlashMessage } from "../../utils/flashMessageContext";

const shortlistingStatus = ["accepted", "rejected"];

export default function ApplicantsTable({ applicants }) {
	const { showMessage } = useFlashMessage();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [currentRow, setCurrentRow] = React.useState(null); // To track the current row for which the popover is open

	const handleClick = (event, rowId) => {
		setAnchorEl(event.currentTarget);
		setCurrentRow(rowId); // Set the row ID for which the popover is triggered
	};

	const handleClose = () => {
		setAnchorEl(null);
		setCurrentRow(null); // Clear the current row ID on popover close
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const statusHandler = async (status, id) => {
		try {
			axios.defaults.withCredentials = true;

			const res = await axios.post(
				`${APPLICATION_END_POINT}/status/${id}/update`,
				{ status }
			);

			if (res.data.success) {
				showMessage("success", res.data.message);
			}
		} catch (error) {
			console.log(error);
			showMessage(
				"error",
				error?.response?.data?.message || "Some error has occured"
			);
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>FullName</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Contact</TableCell>
						<TableCell>Resume</TableCell>
						<TableCell>Created At</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{applicants &&
						applicants?.applications?.map((item) => (
							<TableRow
								key={item._id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell>{item?.applicant?.fullname}</TableCell>
								<TableCell>{item?.applicant?.email}</TableCell>
								<TableCell>{item?.applicant?.phno}</TableCell>
								<TableCell>
									{item.applicant?.profile?.resume ? (
										<a
											className="text-blue-600 cursor-pointer"
											href={item?.applicant?.profile?.resume}
											target="_blank"
											rel="noopener noreferrer"
										>
											{item?.applicant?.profile?.resumeOriginalName}
										</a>
									) : (
										<span>NA</span>
									)}
								</TableCell>
								<TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
								<TableCell align="right">
									<Button
										aria-describedby={id}
										variant="outlined"
										onClick={(e) => handleClick(e, item._id)} // Pass row-specific ID
										sx={{
											backgroundColor: "white",
											color: "#000",
											border: "none",
										}}
									>
										<MoreHorizIcon />
									</Button>
									<Popover
										id={id}
										open={open && currentRow === item._id} // Ensure popover opens for the correct row
										anchorEl={anchorEl}
										onClose={handleClose}
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "left",
										}}
									>
										<Typography sx={{ p: 2 }}>
											{shortlistingStatus.map((status, index) => (
												<div
													onClick={() => {
														statusHandler(status, item._id);
														handleClose(); // Close the popover after status selection
													}}
													key={index}
													className="flex w-fit items-center my-2 cursor-pointer"
												>
													<span>{status}</span>
												</div>
											))}
										</Typography>
									</Popover>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
