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
		<div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-purple-600 mb-2">
						Create Account
					</h1>
					<p className="text-gray-600">Join JobPortal to find your dream job</p>
				</div>
				
				<div className="bg-white rounded-lg shadow-md p-8">
					<form onSubmit={handleSubmit} noValidate encType="multipart/form-data" className="space-y-6">
						<div>
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
								sx={{
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
											borderColor: '#9333ea',
										},
									},
									'& .MuiInputLabel-root.Mui-focused': {
										color: '#9333ea',
									},
								}}
							/>
						</div>
						
						<div>
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
								sx={{
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
											borderColor: '#9333ea',
										},
									},
									'& .MuiInputLabel-root.Mui-focused': {
										color: '#9333ea',
									},
								}}
							/>
						</div>
						
						<div>
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
								sx={{
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
											borderColor: '#9333ea',
										},
									},
									'& .MuiInputLabel-root.Mui-focused': {
										color: '#9333ea',
									},
								}}
							/>
						</div>
						
						<div>
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
								sx={{
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
											borderColor: '#9333ea',
										},
									},
									'& .MuiInputLabel-root.Mui-focused': {
										color: '#9333ea',
									},
								}}
							/>
						</div>
						
						<div>
							<TextField
								fullWidth
								id="file"
								name="file"
								label="Profile Photo (Optional)"
								type="file"
								variant="outlined"
								onChange={changeFileHandler}
								InputLabelProps={{ shrink: true }}
								sx={{
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
											borderColor: '#9333ea',
										},
									},
									'& .MuiInputLabel-root.Mui-focused': {
										color: '#9333ea',
									},
								}}
							/>
						</div>
						
						<div>
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
								sx={{
									'& .MuiOutlinedInput-root': {
										'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
											borderColor: '#9333ea',
										},
									},
									'& .MuiInputLabel-root.Mui-focused': {
										color: '#9333ea',
									},
								}}
							>
								<MenuItem value="student">Student</MenuItem>
								<MenuItem value="recruiter">Recruiter</MenuItem>
							</TextField>
						</div>

						<div>
							<Button
								fullWidth
								variant="contained"
								type="submit"
								sx={{
									backgroundColor: "#9333ea",
									color: "white",
									borderRadius: "8px",
									fontWeight: "600",
									py: 1.5,
									"&:hover": {
										backgroundColor: "#7c3aed",
									},
								}}
							>
								{loading ? "Please wait..." : "Create Account"}
							</Button>
						</div>
					</form>
					
					<div className="text-center mt-6">
						<p className="text-gray-600">
							Already have an account?{" "}
							<Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium">
								Login here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
