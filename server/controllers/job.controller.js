import Job from "../models/job.model.js";
import Company from "../models/company.model.js";
export const postJob = async (req, res) => {
	try {
		const {
			title,
			description,
			requirements,
			salary,
			experienceLevel,
			location,
			jobType,
			position,
			companyId,
		} = req.body;
		const userId = req.user._id;
        
		if (
			!title ||
			!description ||
			!requirements ||
			!salary ||
			!location ||
			!experienceLevel ||
			!jobType ||
			!position ||
			!companyId
		) {
			return res.status(400).json({
				message: "all feilds are required",
				success: false,
			});
		}

		const company = await Company.findById(companyId);
		if (!company) {
			return res.status(404).json({
				message: `Company doesn't found`,
				success: false,
			});
		}
		//check if company createdBy  this user
		if (company.userId.toString() !== userId.toString()) {
			return res.status(403).json({
				message: "You are not authorized to post a job for this company",
				success: false,
			});
		}
		const job = await Job.create({
			title,
			description,
			requirements: requirements.split(","),
			salary: Number(salary),
			experienceLevel,
			location,
			jobType,
			position,
			company,
			createdBy: userId,
		});
		return res.status(200).json({
			message: "new job created successfully",
			job,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

//for student
export const getAllJobs = async (req, res) => {
	try {
		const { keyword } = req.query;
		const query = {
			$or: [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
				{ requirements: { $regex: keyword, $options: "i" } },
				{ location: { $regex: keyword, $options: "i" } },
				{skils:{$regex:keyword,$options:"i"}},
			],
		};
		const jobs = await Job.find(query).populate({ path: "company" });
		if (!jobs) {
			return res.status(400).json({
				message: "jobs not found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "jobs fetched",
			jobs,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

//for student
//get job by id
export const getJobById = async (req, res) => {
	try {
		const jobId = req.params.id;
		const job=await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })
		if (!job) {
			return res.status(400).json({
				message: "job not found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "job fetched",
			job,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

//for admin
//get all jobs created by admin
export const getJobsByAdmin = async (req, res) => {
	try {
		const adminId = req.user._id;
		const jobs = await Job.find({ createdBy: adminId })
			.populate({ path: "company" })
			.sort({ createdAt: -1 });
		if (!jobs) {
			return res.status(400).json({
				message: "jobs are not created",
				success: false,
			});
		}
		return res.status(200).json({
			message: "jobs are fetched",
			jobs,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};
