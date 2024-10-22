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
		<div>
			<h1 className="text-xl font-bold text-[#6A38C2] text-center">
				Welcome Back to JobPortal
			</h1>
			<div className="flex justify-center items-center max-w-7xl mx-auto">
				<form className="sm:w-[100%] md:w-[50%]  sm:px-2 md:px-4 pt-4" onSubmit={handleSubmit} noValidate>
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
								{" "}
								Student{" "}
							</MenuItem>
							<MenuItem key="Recruiter" value="recruiter">
								{" "}
								Recruiter{" "}
							</MenuItem>
						</TextField>{" "}
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
							{loading ? <span>please wait..</span> : <span>Login</span>}
						</Button>
					</div>
				</form>
			</div>
			<p className="text-center text-small text-muted">
				Don't have an acount?{" "}
				<Link to="/signup">
					<span className="text-[#6A38C2] hover:underline">Signup here</span>
				</Link>{" "}
			</p>
			<br /><br /><br /><br /><br />
		</div>
		
	);
}

export default Login;
