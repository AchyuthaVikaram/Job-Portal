import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setLoading } from "../redux/feauters/authSlice.js";
import axios from "axios";
import { useFlashMessage } from "../utils/flashMessageContext";
import { USER_END_POINT } from "../utils/constant";

export default function UpdateProfile({ open, setOpen }) {
	const loading = useSelector((store) => store.auth.loading);
	const user = useSelector((store) => store.auth.user);

	const dispatch = useDispatch();
	const { showMessage } = useFlashMessage();
	const [input, setInput] = useState({
		fullname: user?.fullname || "",
		email: user?.email || "",
		phno: user?.phno || "",
		bio: user?.profile?.bio || "",
		skills: user?.profile?.skills?.join(", ") || "",
		file: user?.profile?.resumeOriginalName || null, // File defaults to null, as expected
	});

	const handleClose = () => {
		setOpen(false);
	};

	const changeEventHandler = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const fileChangeHandler = (e) => {
		const file = e.target.files?.[0];
		setInput({ ...input, file });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("fullname", input.fullname);
		formData.append("email", input.email);
		formData.append("phno", input.phno);
		formData.append("bio", input.bio);
		formData.append("skills", input.skills);
		if (input.file) {
			formData.append("file", input.file);
		}

		try {
			dispatch(setLoading(true));
			const res = await axios.post(
				`${USER_END_POINT}/profile/update`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			if (res.data.success) {
				dispatch(setUser(res.data.user));
				showMessage("success", res.data.message);
			}
		} catch (error) {
			console.error(error);
			showMessage(
				"error",
				error.response?.data?.message || "Something went wrong"
			);
		} finally {
			dispatch(setLoading(false));
			setOpen(false);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			maxWidth="sm" // Sets the max width to "small" by default
			PaperProps={{
				sx: {
					width: {
						xs: "90%", // 90% width for extra small screens (phones)
						sm: "80%", // 80% width for small screens (tablets)
						md: "70%", // 70% width for medium screens (desktops)
						lg: "60%", // 60% width for large screens (wider desktops)
					},
				},
			}}
		>
			<DialogTitle>Edit Profile</DialogTitle>
			<DialogContent>
				<TextField
					required
					id="fullname"
					name="fullname"
					label="Full Name"
					type="text"
					fullWidth
					variant="outlined"
					value={input.fullname}
					onChange={changeEventHandler}
					className="m-4"
				/>
				<TextField
					required
					fullWidth
					id="email"
					name="email"
					label="Email"
					type="email"
					variant="outlined"
					value={input.email}
					onChange={changeEventHandler}
					className="m-4"
				/>
				<TextField
					required
					fullWidth
					id="phno"
					name="phno"
					label="Phone Number"
					type="tel"
					variant="outlined"
					value={input.phno}
					onChange={changeEventHandler}
					className="m-4"
				/>
				<TextField
					required
					fullWidth
					id="bio"
					name="bio"
					label="Bio"
					type="text"
					variant="outlined"
					value={input.bio}
					onChange={changeEventHandler}
					className="m-4"
				/>
				<TextField
					required
					fullWidth
					id="skills"
					name="skills"
					label="Skills"
					type="text"
					variant="outlined"
					value={input.skills}
					onChange={changeEventHandler}
					className="m-4"
				/>
				<TextField
					fullWidth
					id="file"
					name="file"
					label="Upload Resume"
					type="file"
					variant="outlined"
					onChange={fileChangeHandler}
					className="m-4"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={submitHandler} disabled={loading} type="submit">
					{loading ? "Please wait..." : "Edit"}
				</Button>
				<Button onClick={handleClose} disabled={loading}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
}
