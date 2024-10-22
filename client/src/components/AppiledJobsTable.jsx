import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function AppliedJobsTable({ appliedJobs }) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Job Role</TableCell>
						<TableCell>Company Logo</TableCell>
						<TableCell>Company</TableCell>
						<TableCell align="right">Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{appliedJobs.map((application) => (
						<TableRow
							key={application._id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{application.createdAt.split("T")[0]}
							</TableCell>
							<TableCell>{application.job.title}</TableCell>
							<TableCell>
								<Avatar
									src={application.job.company?.logo || "default-logo.png"}
									alt="Imag"
								></Avatar>
							</TableCell>
							<TableCell>{application.job.company?.name}</TableCell>
							<TableCell align="right">
								<Button
									className={` rounded-full text-white px-4 py-2 `}
									sx={{
										backgroundColor: `${
											application?.status === "rejected"
												? "red"
												: application?.status === "pending"
												? "gray"
												: "green"
										}`,
									}}
								>
									{application.status}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				{/* " bg-dark  text-white m-3 p-0 px-1" */}
			</Table>
		</TableContainer>
	);
}
