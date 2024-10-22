import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import { COMPANY_END_POINT } from "../../utils/constant";
import { useFlashMessage } from "../../utils/flashMessageContext";

function CompanySetup() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const params = useParams();
	const companyId = params.id;
	const { showMessage } = useFlashMessage();
	const [company, setCompany] = useState("");
	const [inpObj, setInput] = useState({
		name: "",
		description: "",
		website: "",
		location: "",
		file: null,
	});

	useEffect(() => {
		const fetchSingleCompany = async () => {
			try {
				const res = await axios.get(`${COMPANY_END_POINT}/get/${companyId}`, {
					withCredentials: true,
				});
				if (res.data.success) {
					setCompany(res.data.company);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchSingleCompany();
	}, [companyId]);

	useEffect(() => {
		if (company) {
			setInput({
				name: company.name,
				description: company.description,
				website: company.website,
				location: company.location,
			});
		}
	}, [company]);

	const handleInputChange = (event) => {
		setInput({ ...inpObj, [event.target.name]: event.target.value });
	};
	const handleFileChange = (event) => {
		const file = event.target.files?.[0];
		setInput({ ...inpObj, file });
	};
	const registerCompany = async (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("name", inpObj.name);
		formdata.append("description", inpObj.description);
		formdata.append("website", inpObj.website);
		formdata.append("location", inpObj.location);
		if (inpObj.file) {
			formdata.append("file", inpObj.file);
		}
		try {
			setLoading(true);
			const res = await axios.post(
				`${COMPANY_END_POINT}/update/${companyId}`,
				formdata,

				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			if (res.data.success) {
				setCompany(res.data.company);
				showMessage("success", res.data.message);
				navigate("/admin/companies");
			}
			setLoading(false);
		} catch (e) {
			console.log(e);
			showMessage("error", e.response?.data?.message || "Error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div
				className="flex items-center gap-5 p-8 justify-center"
				style={{ width: "100%" }}
			>
				<Button
					onClick={() => navigate("/admin/companies")}
					variant="outline"
					className="flex items-center gap-2 text-gray-500 font-semibold"
				>
					<KeyboardBackspaceIcon />
					<span>Back</span>
				</Button>
				<h1 className="font-bold text-xl">Company Setup</h1>
			</div>
			<div className="flex justify-center items-center max-w-7xl mx-auto">
				<form
					className="sm:w-3/4 md:w-1/2 p-4 pb-0"
					onSubmit={registerCompany}
					encType="multipart/form-data"
					noValidate
				>
					<div className="m-4" style={{ width: "100%" }}>
						<TextField
							required
							id="name"
							name="name"
							label="Company Name"
							type="text"
							fullWidth
							variant="outlined"
							onChange={handleInputChange}
							value={inpObj.name}
						/>
					</div>
					<div className="m-4" style={{ width: "100%" }}>
						<TextField
							required
							id="file"
							name="file"
							label="Company Logo"
							type="file"
							fullWidth
							variant="outlined"
							onChange={handleFileChange}
						/>
					</div>
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
							id="website"
							name="website"
							label="Website"
							type="text"
							variant="outlined"
							onChange={handleInputChange}
							value={inpObj.website}
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
							{loading ? <span>Please Wait...</span> : <span>Update</span>}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CompanySetup;
