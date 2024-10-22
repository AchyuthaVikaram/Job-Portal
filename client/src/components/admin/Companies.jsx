import { TextField, Button } from "@mui/material";
import CompaniesTable from "./ComapaniesTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { COMPANY_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { setFilterWord } from "../../redux/feauters/filterCompanySlice";

function Companies() {
	const [allCompanies, setAllCompanies] = useState(null);
	const navigate = useNavigate();
	const [input,setInput]= useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const res = await axios.get(`${COMPANY_END_POINT}/get`, { withCredentials: true });
				if (res.data.success) {
					setAllCompanies(res.data.companies);
				}
			} catch (e) {
				console.log(e);
			}
		};
		fetchCompanies();
	}, []); // Added empty dependency array to avoid infinite loop
	useEffect(()=>{
		dispatch(setFilterWord(input));
	},[input,dispatch])

	return (
		<div className="max-w-6xl mx-auto my-10">
			<div className="flex items-center justify-between my-5">
				<div style={{ width: "20%", height: "20px", padding: "1px 2px" }}>
					<TextField
						required
						id="company"
						name="company"
						type="text"
						variant="outlined"
						placeholder="Filter by company name"
						fullWidth
						sx={{
							borderRadius: "1rem",
							"& fieldset": { borderRadius: "10px" },
							height: "40px",
							"& .MuiOutlinedInput-root": {
								height: "40px",
								"& input": {
									height: "40px",
									padding: "2px 14px",
								},
							},
						}}
						value={input}
						onChange={(e)=>setInput(e.target.value)}
					
					/>
				</div>
				<Button
					sx={{
						padding: "10px 20px",
						borderRadius: "10px",
						color: "white",
						backgroundColor: "#5b30a6",
					}}
					onClick={() => navigate("/admin/companies/create")}
				>
					New Company
				</Button>
			</div>
			{allCompanies ? (
				<CompaniesTable allCompanies={allCompanies} setAllCompanies={setAllCompanies}  />
			) : (
				<p className="text-center">Loading companies...</p>
			)}
		</div>
	);
}

export default Companies;
