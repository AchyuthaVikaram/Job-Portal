import TextField from "@mui/material/TextField";
import { MenuItem, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { USER_END_POINT } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../utils/flashMessageContext";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/feauters/authSlice";

function Signup() {
	const loading = useSelector((store) => store.auth.loading);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { showMessage } = useFlashMessage();
	const [inpObj, setInpObj] = useState({
		fullname: "",
		email: "",
		phno: "",
		password: "",
		role: "",
		file: null,
	});
	const [errors, setErrors] = useState({
		fullname: "",
		email: "",
		password: "",
		phno: "",
		role: "",
	});

	const validate = () => {
		const temp = {};
		// validate name
		if (!inpObj.fullname.trim()) {
			temp.fullname = "Name is required!";
		}
		// validate email
		if (!inpObj.email) {
			temp.email = "Email is required!";
		} else if (!/\S+@\S+\.\S+/.test(inpObj.email)) {
			temp.email = "Please enter a valid email";
		}
		// validate phone number
		if (!inpObj.phno) {
			temp.phno = "Phone number is required!";
		} else if (!/^[0-9]{10}$/.test(inpObj.phno)) {
			temp.phno = "Please enter a valid phone number";
		}
		// validate password
		if (!inpObj.password) {
			temp.password = "Password is required!";
		}
		// validate role
		if (!inpObj.role) {
			temp.role = "Role is required!";
		}

		setErrors(temp);

		return Object.keys(temp).length === 0;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInpObj({ ...inpObj, [name]: value });
	};

	const changeFileHandler = (e) => {
		setInpObj({ ...inpObj, file: e.target.files?.[0] });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(); // formdata object
		formData.append("fullname", inpObj.fullname);
		formData.append("email", inpObj.email);
		formData.append("phno", inpObj.phno);
		formData.append("password", inpObj.password);
		formData.append("role", inpObj.role);
		if (inpObj.file) {
			formData.append("file", inpObj.file);
		}

		if (validate()) {
			try {
				dispatch(setLoading(true));
				const res = await axios.post(`${USER_END_POINT}/register`, formData, {
					headers: { "Content-Type": "multipart/form-data" },
					withCredentials: true,
				});

				if (res.data.success) {
					showMessage("success", res.data.message);
					navigate("/login");
				} else {
					showMessage("error", res.data.message);
				}
			} catch (error) {
				if (error.response) {
					showMessage("error", error.response.data.message);
				} else {
					showMessage("error", "An error occurred. Please try again.");
					console.log(error);
				}
			} finally {
				dispatch(setLoading(false));
			}
		}
	};

	return (
		<div>
			<h1 className="text-xl font-bold text-[#6A38C2] text-center">
				Register for JobPortal
			</h1>
			<div className="flex justify-center items-center max-w-7xl mx-auto">
				<form
					className="sm:w-[100%] md:w-[50%] p-4 pb-0"
					onSubmit={handleSubmit}
					noValidate
					encType="multipart/form-data"
				>
					<div className="m-4" style={{ width: "100%" }}>
						<TextField
							required
							id="fullname"
							name="fullname"
							label="Full Name"
							type="text"
							fullWidth
							variant="outlined"
							onChange={handleInputChange}
							value={inpObj.fullname}
							error={!!errors.fullname}
							helperText={errors.fullname}
						/>
					</div>
					<div className="m-4" style={{ width: "100%" }}>
						<TextField
							required
							fullWidth
							id="email"
							name="email"
							label="Email"
							type="email"
							variant="outlined"
							value={inpObj.email}
							onChange={handleInputChange}
							error={!!errors.email}
							helperText={errors.email}
						/>
					</div>
					<div className="m-4" style={{ width: "100%" }}>
						<TextField
							required
							fullWidth
							id="password"
							name="password"
							label="Password"
							type="password"
							variant="outlined"
							onChange={handleInputChange}
							value={inpObj.password}
							error={!!errors.password}
							helperText={errors.password}
						/>
					</div>
					<div className="m-4" style={{ width: "100%" }}>
						<TextField
							fullWidth
							id="file"
							name="file"
							label="Profile Photo"
							type="file"
							variant="outlined"
							onChange={changeFileHandler}
						/>
					</div>
					<div className="m-4" style={{ width: "100%" }}>
						<TextField
							required
							fullWidth
							id="phno"
							name="phno"
							label="Phone Number"
							type="tel"
							variant="outlined"
							onChange={handleInputChange}
							value={inpObj.phno}
							error={!!errors.phno}
							helperText={errors.phno}
						/>
					</div>
					<div className="m-4" style={{ width: "100%" }}>
						<TextField
							fullWidth
							required
							id="role"
							select
							name="role"
							value={inpObj.role}
							onChange={handleInputChange}
							label="Role"
							error={!!errors.role}
							helperText={errors.role}
						>
							<MenuItem key="Student" value="student">
								Student
							</MenuItem>
							<MenuItem key="Recruiter" value="recruiter">
								Recruiter
							</MenuItem>
						</TextField>
					</div>

					<div className="m-4 flex justify-center" style={{ width: "100%" }}>
						<Button
							variant="text"
							type="submit"
							sx={{
								width: "50%",
								color: "white",
								backgroundColor: "#6A38C2",
								borderRadius: "0.5rem",
								fontWeight: "bold",
								"&:hover": {
									backgroundColor: "#5b30a6",
								},
							}}
						>
							{loading ? <span>Please wait...</span> : <span>Register</span>}
						</Button>
					</div>
				</form>
			</div>
			<p className="text-center text-small text-muted">
				Already have an account?{" "}
				<Link to="/login">
					<span className="text-[#6A38C2] hover:underline">Login here</span>
				</Link>
			</p>
		</div>
	);
}

export default Signup;
