import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/feauters/filterQuerySlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
    const [searchVal,setSerachVal]=useState(null);
	const navigate=useNavigate();
	const dispatch =useDispatch();

	const handleChange=(e)=>{
		setSerachVal(e.target.value);
		dispatch(setQuery(e.target.value));
	}
	const handleSearch=()=>{
		navigate("/browse");
	}
	return (
		<div className=" flex  flex-col  justify-center items-center  ">
			{" "}
			<span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium ">
				No. 1 Job Hunt Website
			</span>
			<h1 className="text-2xl font-bold mb-5 mt-3 md:text-5xl">
				Search, Apply & Get Your{" "}
				<span className="text-[#6A38C2]">Dream Jobs</span>
			</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
				aspernatur temporibus nihil tempora dolor!
			</p>
			<div className="flex w-[100%] md:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 m-5">
				<input
					type="text"
					placeholder="Find your dream jobs"
					className="outline-none border-none w-full"
                    value={searchVal}
                    onChange={handleChange}

				/>
				<Button
					variant="contained"
					sx={{
						color: "white",
						backgroundColor: "#6A38C2",
						borderBottomRightRadius: "1rem",
                        borderTopRightRadius: "1rem",
						fontWeight: "bold",
						"&:hover": {
							backgroundColor: "#5b30a6",
						},
					}}
					onClick={handleSearch}
				>
					<SearchIcon />
				</Button>
			</div>
		</div>
	);
}

export default HeroSection;
