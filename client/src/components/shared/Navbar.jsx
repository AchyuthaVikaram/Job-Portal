// import * as React from "react";
// import Popover from "@mui/material/Popover";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { Link, useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../../redux/feauters/authSlice";
// import axios from "axios";
// import { USER_END_POINT } from "../../utils/constant";
// import { useFlashMessage } from "../../utils/flashMessageContext";
// import Avatar from "@mui/material/Avatar";

// function Navbar() {
// 	const user = useSelector((state) => {
// 		return state.auth.user;
// 	});
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	const [anchorEl, setAnchorEl] = React.useState(null);
// 	const { showMessage } = useFlashMessage();

// 	const handleClick = (event) => {
// 		setAnchorEl(event.currentTarget);
// 	};

// 	const handleClose = () => {
// 		setAnchorEl(null);
// 	};
// 	const handleLogOut = async () => {
// 		try {
// 			const res = await axios.get(`${USER_END_POINT}/logout`, {
// 				withCredentials: true,
// 			});
// 			if (res.data.success) {
// 				dispatch(setUser(null));
// 				navigate("/");
// 				showMessage("success", res.data.message);
// 			}
// 		} catch (e) {
// 			console.log(e);
// 			showMessage("error", e.response.data.message);
// 		}
// 	};

// 	const open = Boolean(anchorEl);
// 	const id = open ? "simple-popover" : undefined;

// 	return (
// 		<div
// 			className="bg-white flex justify-between p-3 mx-auto items-center h-16 "
// 			style={{ width: "100%" }}
// 		>
// 			<div style={{ width: "70%" }}>
// 				<h1 className="text-2xl font-bold">
// 					Job<span className="text-[#f83002]">Portal</span>
// 				</h1>
// 			</div>
// 			<div style={{ width: "30%" }}>
// 				<ul className="flex font-medium items-center justify-evenly">
// 					{user && user.role === "recruiter" ? (
// 						<>
// 							<li>
// 								<Link to="/admin/companies">Company</Link>{" "}
// 							</li>
// 							<li>
// 								<Link to="/admin/jobs">Jobs</Link>
// 							</li>
// 						</>
// 					) : (
// 						<>
// 							<li>
// 								<Link to="/">Home</Link>{" "}
// 							</li>
// 							<li>
// 								<Link to="/jobs">Jobs</Link>
// 							</li>
// 							<li>
// 								<Link to="/browse">Browse</Link>
// 							</li>
// 						</>
// 					)}

// 					{!user ? (
// 						<li>
// 							<div className="flex gap-2">
// 								<Button
// 									variant="text"
// 									href="/login"
// 									sx={{
// 										color: "white",
// 										backgroundColor: "#6A38C2",
// 										borderRadius: "0.5rem",
// 										fontWeight: "bold",
// 										"&:hover": {
// 											backgroundColor: "#5b30a6",
// 										},
// 									}}
// 								>
// 									Login
// 								</Button>
// 								<Button
// 									variant="text"
// 									href="/signup"
// 									sx={{
// 										color: "white",
// 										backgroundColor: "#6A38C2",
// 										borderRadius: "0.5rem",
// 										fontWeight: "bold",
// 										"&:hover": {
// 											backgroundColor: "#5b30a6",
// 										},
// 									}}
// 								>
// 									SignUp
// 								</Button>
// 							</div>
// 						</li>
// 					) : (
// 						<div>
// 							<Avatar
// 								src={user.profile.profilePhoto || "default-logo.png"}
// 								alt="Imag"
// 								onClick={handleClick}
// 							></Avatar>

// 							<Popover
// 								id={id}
// 								open={open}
// 								anchorEl={anchorEl}
// 								onClose={handleClose}
// 								anchorOrigin={{
// 									vertical: "bottom",
// 									horizontal: "left",
// 								}}
// 							>
// 								<Typography sx={{ p: 2 }}>
// 									<div className="flex items-center">
// 										<AccountCircleIcon className="text-3xl"></AccountCircleIcon>
// 										<div className="p-3 text-smallfont-medium ">
// 											<h4 className="pb-0 mb-0 font-bold ">{user.fullname}</h4>
// 											<p className="text-muted text-xs pt-0 mt-0">
// 												{user.profile?.bio}
// 											</p>
// 										</div>
// 									</div>
// 									<div className="flex justify-around ">
// 										{user && user.role === "student" && (
// 											<Button
// 												variant="text"
// 												sx={{
// 													color: "white",
// 													backgroundColor: "#6A38C2",
// 													borderRadius: "0.5rem",
// 													fontSize: "0.7rem",
// 													fontWeight: "bold",
// 													"&:hover": {
// 														backgroundColor: "#5b30a6",
// 													},
// 												}}
// 											>
// 												<Link to="/user/profile">View Profile </Link>
// 											</Button>
// 										)}

// 										<Button
// 											variant="text"
// 											sx={{
// 												color: "white",
// 												backgroundColor: "#6A38C2",
// 												borderRadius: "0.5rem",
// 												fontSize: "0.7rem",
// 												padding: "2px 1px",
// 												fontWeight: "bold",
// 												"&:hover": {
// 													backgroundColor: "#5b30a6",
// 												},
// 											}}
// 											href="#contained-buttons"
// 											onClick={handleLogOut}
// 										>
// 											Logout
// 										</Button>
// 									</div>
// 								</Typography>
// 							</Popover>
// 						</div>
// 					)}
// 				</ul>
// 			</div>
// 		</div>
// 	);
// }

// export default Navbar;
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/feauters/authSlice";
import axios from "axios";
import { USER_END_POINT } from "../../utils/constant";
import { useFlashMessage } from "../../utils/flashMessageContext";
import Avatar from "@mui/material/Avatar";

function Navbar() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { showMessage } = useFlashMessage();
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogOut = async () => {
		try {
			const res = await axios.get(`${USER_END_POINT}/logout`, {
				withCredentials: true,
			});
			if (res.data.success) {
				dispatch(setUser(null));
				navigate("/");
				showMessage("success", res.data.message);
			}
		} catch (e) {
			console.log(e);
			showMessage("error", e.response.data.message);
		}
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	// Toggle Drawer
	const toggleDrawer = (open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}
		setDrawerOpen(open);
	};

	return (
		<div
			className="bg-white flex justify-between p-3 mx-auto items-center h-16"
			style={{ width: "100%" }}
		>
			<div style={{ width: "70%" }}>
				<h1 className="text-2xl font-bold">
					Job<span className="text-[#f83002]">Portal</span>
				</h1>
			</div>

			{/* For larger screens */}
			<div className="hidden md:flex md:justify-evenly" style={{ width: "40%" }}>
				<ul className="flex font-medium items-center justify-evenly" style={{width:"100%"
				}}>
					{user && user.role === "recruiter" ? (
						<>
							<li>
								<Link to="/admin/companies">Company</Link>
							</li>
							<li>
								<Link to="/admin/jobs">Jobs</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/jobs">Jobs</Link>
							</li>
							<li>
								<Link to="/browse">Browse</Link>
							</li>
						</>
					)}

					{!user ? (
						<li>
							<div className="flex gap-2">
								<Button
									variant="text"
									href="/login"
									sx={{
										color: "white",
										backgroundColor: "#6A38C2",
										borderRadius: "0.5rem",
										fontWeight: "bold",
										"&:hover": {
											backgroundColor: "#5b30a6",
										},
									}}
								>
									Login
								</Button>
								<Button
									variant="text"
									href="/signup"
									sx={{
										color: "white",
										backgroundColor: "#6A38C2",
										borderRadius: "0.5rem",
										fontWeight: "bold",
										"&:hover": {
											backgroundColor: "#5b30a6",
										},
									}}
								>
									SignUp
								</Button>
							</div>
						</li>
					) : (
						<div>
							<Avatar
								src={user.profile.profilePhoto || "default-logo.png"}
								alt="Imag"
								onClick={handleClick}
							></Avatar>

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
									<div className="flex items-center">
										<AccountCircleIcon className="text-3xl"></AccountCircleIcon>
										<div className="p-3 text-small font-medium">
											<h4 className="pb-0 mb-0 font-bold">{user.fullname}</h4>
											<p className="text-muted text-xs pt-0 mt-0">
												{user.profile?.bio}
											</p>
										</div>
									</div>
									<div className="flex justify-around">
										{user && user.role === "student" && (
											<Button
												variant="text"
												sx={{
													color: "white",
													backgroundColor: "#6A38C2",
													borderRadius: "0.5rem",
													fontSize: "0.7rem",
													fontWeight: "bold",
													"&:hover": {
														backgroundColor: "#5b30a6",
													},
												}}
											>
												<Link to="/user/profile">View Profile</Link>
											</Button>
										)}

										<Button
											variant="text"
											sx={{
												color: "white",
												backgroundColor: "#6A38C2",
												borderRadius: "0.5rem",
												fontSize: "0.7rem",
												padding: "2px 1px",
												fontWeight: "bold",
												"&:hover": {
													backgroundColor: "#5b30a6",
												},
											}}
											onClick={handleLogOut}
										>
											Logout
										</Button>
									</div>
								</Typography>
							</Popover>
						</div>
					)}
				</ul>
			</div>

			{/* For smaller screens */}
			<div className="flex md:hidden items-center">
				{!user ? (
					<div className="flex gap-2">
						<Button
							variant="text"
							href="/login"
							sx={{
								color: "white",
								backgroundColor: "#6A38C2",
								borderRadius: "0.5rem",
								fontWeight: "bold",
								"&:hover": {
									backgroundColor: "#5b30a6",
								},
							}}
						>
							Login
						</Button>
						<Button
							variant="text"
							href="/signup"
							sx={{
								color: "white",
								backgroundColor: "#6A38C2",
								borderRadius: "0.5rem",
								fontWeight: "bold",
								"&:hover": {
									backgroundColor: "#5b30a6",
								},
							}}
						>
							SignUp
						</Button>
					</div>
				) : (
					<Avatar
						src={user.profile.profilePhoto || "default-logo.png"}
						alt="Imag"
						onClick={handleClick}
					></Avatar>
				)}

				<IconButton
					edge="end"
					color="inherit"
					aria-label="menu"
					onClick={toggleDrawer(true)}
				>
					<MenuIcon />
				</IconButton>

				<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
					<div className="p-4" role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
						<ul className="space-y-4 font-medium">
						{user && user.role === "recruiter" ? (
						<>
							<li>
								<Link to="/admin/companies">Company</Link>
							</li>
							<li>
								<Link to="/admin/jobs">Jobs</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/jobs">Jobs</Link>
							</li>
							<li>
								<Link to="/browse">Browse</Link>
							</li>
						</>
					)}
						</ul>
					</div>
				</Drawer>
			</div>
		</div>
	);
}

export default Navbar;
