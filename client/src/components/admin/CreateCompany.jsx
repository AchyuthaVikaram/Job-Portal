import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMPANY_END_POINT } from "../../utils/constant";
import { useFlashMessage } from "../../utils/flashMessageContext";
import axios from "axios";

function CreateCompany() {
	const [name, setCompanyName] = useState("");
	const { showMessage } = useFlashMessage();
	const navigate = useNavigate();
	const registerNewCompany = async () => {
		try {
			const res = await axios.post(
				`${COMPANY_END_POINT}/register`,
				{ name },
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			if (res.data.success) {

				showMessage("success", res.data.message);
				const companyId = res.data.company._id;
				navigate(`/admin/companies/${companyId}`);
			}
		} catch (error) {
			console.log(error);
			showMessage("error", error.response.data.message);
		}
	};
	return (
		<div>
			<div className="max-w-4xl mx-auto px-3">
				<div className="my-10">
					<h1 className="font-bold text-2xl">Your Company Name</h1>
					<p className="text-gray-500 mt-4">
						What would you like to give your company name? you can change this
						later.
					</p>
				</div>
				<TextField
					required
					fullWidth
					id="name"
					name="name"
					label="Company Name"
					type="text"
					variant="outlined"
					value={name}
					className="mb-2"
					placeholder="JobPortal, Microsoft etc."
					onChange={(event) => setCompanyName(event.target.value)}
				/>

				<div className="flex items-center gap-2 my-10">
					<Button
						variant="contained"
						onClick={() => navigate("/admin/companies")}
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
						Cancel
					</Button>
					<Button
						sx={{
							color: "white",
							backgroundColor: "#6A38C2",
							borderRadius: "0.5rem",
							fontWeight: "bold",
							"&:hover": {
								backgroundColor: "#5b30a6",
							},
						}}
						onClick={registerNewCompany}
					>
						Continue
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CreateCompany;
