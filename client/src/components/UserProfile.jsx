import Avatar from "@mui/joy/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AppliedJobsTable from "./AppiledJobsTable";
import { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { APPLICATION_END_POINT } from "../utils/constant";

function UserProfile() {
	const [appliedJobs, setAppliedJobs] = useState([]);
	useEffect(() => {
		const fetchAppliedJobs = async () => {
			try {
				const res = await axios.get(`${APPLICATION_END_POINT}/get`, {
					withCredentials: true,
				});
				if (res.data.success) {
					setAppliedJobs(res.data.applications);
				}
			} catch (e) {
				console.log(e);
			}
		};
		fetchAppliedJobs();
	}, []);
	const user = useSelector((store) => store.auth.user);
	const isResume = true;
	const [open, setOpen] = useState(false);
	return (
		<div className="max-w-4xl mx-auto my-5 bg-white border-gray-100 rounded p-5 ">
			<div className="flex  sm:justify-center md:justify-between items-center gap-5 flex-wrap">
				{" "}
				<Avatar
					alt={user.fullname}
					src={user.profile.profilePhoto || "default-logo.png"}
					size="lg"
					sx={{
						width: "10rem",
						height: "10rem",
					}}
				/>
				<div className="flex justify-between md:w-[70%]">
					<div className="flex  flex-col justify-center ">
						<h1 className="text-2xl font-bold my-3">{user?.fullname}</h1>
						<p>{user?.profile?.bio}</p>
					</div>
					<div className="flex flex-col justify-center text-lg">
						{/* <Button variant="outlined" color="dark" ></Button> */}
						<EditIcon onClick={() => setOpen(true)} />
					</div>
				</div>
			</div>
			<div>
				<div className="flex items-center  gap-3 m-3">
					<EmailIcon />
					<span>{user?.email}</span>
				</div>
				<div className="flex items-center  gap-3 m-3">
					<LocalPhoneIcon />
					<span>{user?.phno}</span>
				</div>
			</div>
			<div>
				<h1 className="font-medium text-lg m-3">Skills</h1>
				{user?.profile?.skills.length == 0 ? (
					<span>NA</span>
				) : (
					user?.profile?.skills.map((skill, index) => (
						<Button
							key={index}
							className=" bg-dark  text-white m-3 p-0 px-1"
							sx={{ borderRadius: "20rem" }}
						>
							{skill}
						</Button>
					))
				)}
			</div>
			<div>
				<h1 className="font-medium text-lg m-3">Resume</h1>
				{isResume ? (
					<a
						alt={user.profile.resumeOriginalName}
						href={user.profile.resume}
						target="blank"
						className="text-primary m-3"
					>
						{user.profile.resumeOriginalName}
					</a>
				) : (
					<span>NA</span>
				)}
			</div>
			<div>
				{appliedJobs.length == 0 ? (
					<p className="p-2 text-center text-muted my-4">
						No applied jobs till now .{" "}
						<Link to="/jobs" className="text-blue-500">
							Apply here
						</Link>
					</p>
				) : (
					<>
						<h1 className="font-medium text-lg m-3">Applied Jobs</h1>

						<AppliedJobsTable appliedJobs={appliedJobs} />
					</>
				)}
			</div>
			<UpdateProfile open={open} setOpen={setOpen} />
		</div>
	);
}

export default UserProfile;
