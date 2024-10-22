import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import { COMPANY_END_POINT, JOB_END_POINT } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../utils/flashMessageContext";

function CreateJob() {
	const [loading, setLoading] = useState(false);
	const [allCompanies, setAllCompanies] = useState([]);
	const navigate = useNavigate();
	const { showMessage } = useFlashMessage();
	const [inpObj, setInpObj] = useState({
		title: "",
		description: "",
		requirements: "",
		salary: "",
		location: "",
		jobType: "",
		experienceLevel: 0,
		position: 0,
		companyId: "",
	});

	const postJob = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await axios.post(`${JOB_END_POINT}/post`, inpObj, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
			if (res.data.success) {
				showMessage("success", res.data.message);
				navigate("/admin/jobs");
			}
			setLoading(false);
		} catch (e) {
			console.log(e);
			showMessage("error", e.response?.data?.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e) => {
		setInpObj({ ...inpObj, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const res = await axios.get(`${COMPANY_END_POINT}/get`, {
					withCredentials: true,
				});
				if (res.data.success) {
					setAllCompanies(res.data.companies);
				}
			} catch (e) {
				console.log(e);
			}
		};
		fetchCompanies();
	}, [showMessage]);

	return (
		<div>
			<div
				className="flex items-center gap-5 p-8 justify-center"
				style={{ width: "100%" }}
			>
				<Button
					onClick={() => navigate("/admin/jobs")}
					variant="outline"
					className="flex items-center gap-2 text-gray-500 font-semibold"
				>
					<KeyboardBackspaceIcon />
					<span>Back</span>
				</Button>
				<h1 className="font-bold text-xl">Setup a Job to post</h1>
			</div>
			{allCompanies.length === 0 ? (
				<p className="text-lg font-bold text-red-700 text-center">
					You must register at least one company to post a job.
				</p>
			) : (
				<div className="flex justify-center items-center max-w-7xl mx-auto">
					<form className="sm:w-3/4 md:w-1/2 pb-0" onSubmit={postJob} noValidate>
						<div className="flex p-0 m-0" style={{ width: "100%" }}>
							<div className="m-4" style={{ width: "100%" }}>
								<TextField
									required
									id="title"
									name="title"
									label="Job Name"
									type="text"
									fullWidth
									variant="outlined"
									onChange={handleInputChange}
									value={inpObj.title}
								/>
							</div>
						</div>

						<div className="flex p-0 m-0" style={{ width: "100%" }}>
							<div className="m-4" style={{ width: "100%" }}>
								<TextField
									fullWidth
									required
									id="companyId"
									select
									name="companyId"
									value={inpObj.companyId}
									onChange={handleInputChange}
									label="Select Company"
								>
									{allCompanies.map((company) => (
										<MenuItem key={`${company._id}`} value={`${company._id}`}>
											{company.name}
										</MenuItem>
									))}
								</TextField>
							</div>
						</div>
						<div className="flex p-0 m-0" style={{ width: "100%" }}>
							<div className="m-4" style={{ width: "100%" }}>
								<TextField
									required
									fullWidth
									id="description"
									name="description"
									label="Description"
									type="text"
									variant="outlined"
									value={inpObj.description}
									onChange={handleInputChange}
								/>
							</div>

							<div className="m-4" style={{ width: "100%" }}>
								<TextField
									required
									fullWidth
									id="requirements"
									name="requirements"
									label="Requirements"
									type="text"
									variant="outlined"
									onChange={handleInputChange}
									value={inpObj.requirements}
								/>
							</div>
						</div>
						<div className="flex p-0 m-0" style={{ width: "100%" }}>
							<div className="m-4" style={{ width: "100%" }}>
								<TextField
									required
									fullWidth
									id="salary"
									name="salary"
									label="Package"
									type="text"
									variant="outlined"
									onChange={handleInputChange}
									value={inpObj.salary}
								/>
							</div>

							<div className="m-4" style={{ width: "100%" }}>
								<TextField
									required
									fullWidth
									id="location"
									name="location"
									label="Location"
									type="text"
									variant="outlined"
									onChange={handleInputChange}
									value={inpObj.location}
								/>
							</div>
							<div className="m-4" style={{ width: "100%" }}>
								<TextField
									required
									fullWidth
									id="jobType"
									name="jobType"
									label="Job Type"
									type="text"
									variant="outlined"
									onChange={handleInputChange}
									value={inpObj.jobType}
								/>
							</div>
						</div>
						<div className="flex p-0 m-0" style={{ width: "100%" }}>
							<div className="m-4" style={{ width: "100%" }}>
								<TextField
									required
									fullWidth
									id="experienceLevel"
									name="experienceLevel"
									label="Experience Level"
									type="number"
									variant="outlined"
									value={inpObj.experienceLevel}
									onChange={handleInputChange}
								/>
							</div>

							<div className="m-4" style={{ width: "100%" }}>
								<TextField
									required
									fullWidth
									id="position"
									name="position"
									label="No of Openings "
									type="number"
									variant="outlined"
									value={inpObj.position}
									onChange={handleInputChange}
								/>
							</div>
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
								{loading ? <span>Please Wait...</span> : <span>Post Job</span>}
							</Button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

export default CreateJob;
