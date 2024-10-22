import axios from "axios";
import { useEffect } from "react";
import { JOB_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/feauters/jobSlice";

function useGetAllJobs() {
	const dispatch = useDispatch();
	// const jobs=useSelector(store=>store.job.alljobs);
	// console.log("before useHook",jobs);
	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const res = await axios.get(`${JOB_END_POINT}/get?keyword= `, {
					withCredentials: true,
				});
				if (res.data.success) {
					// console.log(res);
					dispatch(setAllJobs(res.data.jobs));
					
					// console.log("after useHook",jobs);
				}
			} catch (e) {
				console.log(e);
			}
		};
        fetchJobs();
	}, []);
}

export default useGetAllJobs;
