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
		const { keyword, page = 1, limit = 10, location, salary, jobType } = req.query;
		
		let query = {};
		
		// Build search query
		if (keyword && keyword.trim() !== '' && keyword.trim() !== ' ') {
			query.$or = [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
				{ requirements: { $regex: keyword, $options: "i" } },
				{ location: { $regex: keyword, $options: "i" } },
			];
		}
		
		// Add location filter
		if (location && location.trim() !== '') {
			query.location = { $regex: location, $options: "i" };
		}
		
		// Add salary range filter
		if (salary && salary.trim() !== '') {
			const salaryRange = salary.toLowerCase();
			if (salaryRange === '0-40k') {
				query.salary = { $gte: 0, $lte: 40000 };
			} else if (salaryRange === '41k-1lac') {
				query.salary = { $gte: 41000, $lte: 100000 };
			} else if (salaryRange === '1lac-5lac') {
				query.salary = { $gte: 100000, $lte: 500000 };
			}
		}
		
		// Add job type filter (for industry/role)
		if (jobType && jobType.trim() !== '') {
			query.$or = query.$or || [];
			query.$or.push(
				{ title: { $regex: jobType, $options: "i" } },
				{ jobType: { $regex: jobType, $options: "i" } }
			);
		}
		
		const skip = (parseInt(page) - 1) * parseInt(limit);
		const totalJobs = await Job.countDocuments(query);
		
		const jobs = await Job.find(query)
			.populate({ path: "company" })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(parseInt(limit));
			
		return res.status(200).json({
			message: "jobs fetched successfully",
			jobs,
			totalJobs,
			currentPage: parseInt(page),
			totalPages: Math.ceil(totalJobs / parseInt(limit)),
			success: true,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			message: "Server error while fetching jobs",
			success: false,
		});
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
		const { company } = req.query;
		
		let query = { createdBy: adminId };
		
		// If company ID is provided, filter jobs by that company
		if (company) {
			query.company = company;
		}
		
		const jobs = await Job.find(query)
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
		return res.status(500).json({
			message: "Server error while fetching jobs",
			success: false,
		});
	}
};

//for admin
//delete job
export const deleteJob = async (req, res) => {
	try {
		const jobId = req.params.id;
		const adminId = req.user._id;
		
		// Find the job and check if it belongs to the admin
		const job = await Job.findById(jobId);
		if (!job) {
			return res.status(404).json({
				message: "Job not found",
				success: false,
			});
		}
		
		// Check if the job belongs to the admin
		if (job.createdBy.toString() !== adminId.toString()) {
			return res.status(403).json({
				message: "You are not authorized to delete this job",
				success: false,
			});
		}
		
		// Delete the job
		await Job.findByIdAndDelete(jobId);
		
		return res.status(200).json({
			message: "Job deleted successfully",
			success: true,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			message: "Server error while deleting job",
			success: false,
		});
	}
};
