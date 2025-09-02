import TextField from "@mui/material/TextField";
import { MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_END_POINT } from "../../utils/constant";
import { useFlashMessage } from "../../utils/flashMessageContext";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../../redux/feauters/authSlice";

function Login() {
	const { loading, user } = useSelector((store) => store.auth);

	const { showMessage } = useFlashMessage();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [inpObj, setInpObj] = useState({
		email: "",
		password: "",
		role: "",
	});
	const [errors, setErrors] = new useState({
		email: "",
		password: "",
		role: "",
	});
	const validate = () => {
		const temp = {};

		//email
		if (!inpObj.email) {
			temp.email = "email is required!";
		} else if (!/\S+@\S+\.\S+/.test(inpObj.email)) {
			temp.email = "please enter a valid email";
		}

		//password
		if (!inpObj.password) {
			temp.password = "password is required!";
		}

		//role
		if (!inpObj.role) {
			temp.role = "role is required!";
		}

		setErrors(temp);

		return Object.keys(temp).length === 0;
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInpObj({ ...inpObj, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			try {
				dispatch(setLoading(true));
				const res = await axios.post(`${USER_END_POINT}/login`, inpObj, {
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				});

				if (res.data.success) {
					showMessage("success", res.data.message);
					dispatch(setUser(res.data.user));
					// alert(res.data.message);
					navigate("/");
				} else {
					showMessage("error", res.data.message);
					// alert(res.data.message);
				}
			} catch (error) {
				if (error.response) {
					// console.log("Error Response Data:", error.response.data.message);
					// console.log("Error Response Status:", error.response.status);
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
	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, []);
	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-purple-600 mb-2">
						Welcome Back
					</h1>
					<p className="text-gray-600">Sign in to your JobPortal account</p>
				</div>
				
				<div className="bg-white rounded-lg shadow-md p-8">
					<form onSubmit={handleSubmit} noValidate className="space-y-6">
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
								{loading ? "Please wait..." : "Login"}
							</Button>
						</div>
					</form>
					
					<div className="text-center mt-6">
						<p className="text-gray-600">
							Don't have an account?{" "}
							<Link to="/signup" className="text-purple-600 hover:text-purple-800 font-medium">
								Sign up here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
