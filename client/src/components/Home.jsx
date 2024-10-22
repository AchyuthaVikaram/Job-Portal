import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";
import CategoryCarouser from "./CategoryCarouser";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
	useGetAllJobs(); // Custom hook to fetch all jobs

	const { user } = useSelector((store) => store.auth); // Accessing user from Redux store
	const navigate = useNavigate(); // For navigation

	useEffect(() => {
		// If the user is a recruiter, redirect them to the admin companies page
		if (user?.role === "recruiter") {
			navigate("/admin/companies");
		}
	}, [user, navigate]); // Added `user` and `navigate` as dependencies

	return (
		<div className="flex flex-column items-center justify-center p-5">
			<HeroSection /> {/* Main hero section */}
			{/* <CategoryCarouser /> Uncomment this when you want to use the carousel */}
			<LatestJobs /> {/* Display latest job postings */}
		</div>
	);
}

export default Home;
