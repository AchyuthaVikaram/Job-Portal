import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APPLICATION_END_POINT } from "../../utils/constant";
import ApplicantsTable from "./ApplicantsTable";

function Applicants() {
	const params = useParams();
	const jobId = params.id;
	const [applicants, setApplicants] = useState([1, 2, 3]);
	useEffect(() => {
		const fetchApplicatns = async () => {
			try {
				const res = await axios.get(
					`${APPLICATION_END_POINT}/${jobId}/applicants`,
					{ withCredentials: true }
				);
				if (res.data.success) {
					setApplicants(res.data.job);
				}
			} catch (e) {
				console.log(e);
			}
		};
		fetchApplicatns();
	}, []);
	return (
		<div className="max-w-7xl mx-auto">
			<h1 className="font-bold text-xl my-5">
				Applicants ({applicants?.applications?.length})
			</h1>
			{applicants?.applications?.length == 0 ? (
				<p className="text-center text-lg font-bold">
					No Applicantions yet for this job
				</p>
			) : (
				<ApplicantsTable applicants={applicants} />
			)}
		</div>
	);
}

export default Applicants;
