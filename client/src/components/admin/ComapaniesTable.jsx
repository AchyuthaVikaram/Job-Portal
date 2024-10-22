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

export default function CompaniesTable({ allCompanies, setAllCompanies }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedCompany, setSelectedCompany] = React.useState(null);
	const input = useSelector((store) => {
		return store.filter.filterWord;
	});
	const [filterComapnies, setFilterdComapnies] = React.useState(allCompanies);

	React.useEffect(() => {
		if (input) {
			let filteredComapnies = allCompanies.filter((company) =>
				company.name.toLowerCase().includes(input.toLowerCase())
			);
			setFilterdComapnies(filteredComapnies);
		} else {
			setFilterdComapnies(allCompanies); // Show all companies when input is empty
		}
	}, [input, allCompanies]);
	const handleClick = (event, company) => {
		setAnchorEl(event.currentTarget);
		setSelectedCompany(company);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSelectedCompany(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<>
			{allCompanies.length == 0 ? (
				<p className="text-center font-bold text-lg">
					You haven't registered any company till now
				</p>
			) : (
				<>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="companies table">
							<TableHead>
								<TableRow>
									<TableCell>Logo</TableCell>
									<TableCell align="center">Name</TableCell>
									<TableCell align="center">Date</TableCell>
									<TableCell align="right">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filterComapnies.map((company) => (
									<TableRow
										key={company._id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell>
											<Avatar
												alt={company.name}
												src={company.logo || "default-logo.png"}
											/>
										</TableCell>
										<TableCell align="center">{company.name}</TableCell>
										<TableCell align="center">
											{new Date(company.createdAt).toLocaleDateString()}
										</TableCell>
										<TableCell align="right">
											<Button
												aria-describedby={id}
												variant="outlined"
												onClick={(event) => handleClick(event, company)}
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
													<Link to={`/admin/companies/${selectedCompany?._id}`}>
														<div className="flex justify-center items-center gap-2">
															<EditIcon sx={{ width: "20px" }} />
															<span>Edit</span>
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
						A list of your recent registered companies
					</p>{" "}
				</>
			)}
		</>
	);
}
