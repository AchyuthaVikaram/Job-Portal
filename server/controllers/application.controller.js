import Application from "../models/applications.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
	try {
		const userId = req.user._id;
		const { id: jobId } = req.params;
		if (!jobId) {
			return res.status(400).json({
				message: "job id is required",
				success: false,
			});
		}
		//check if job is present
		const job = await Job.findById(jobId);
		if (!job) {
			return res.status(400).json({
				message: "job not found ",
				success: false,
			});
		}
		//check if the user has alredy applied for the job
		const existied = await Application.findOne({
			job: jobId,
			applicant: userId,
		});
		if (existied) {
			return res.status(400).json({
				message: "you have alredy applied for this job",
				success: false,
			});
		}
		const applicant = await Application.create({
			job: jobId,
			applicant: userId,
		});
		job.applications.push(applicant._id);
		await job.save();
		return res.status(200).json({
			message: "Job applied suucessfully",
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

//get all applied jobs for an user
export const getAppliedJobs = async (req, res) => {
	try {
		const userId = req.user._id;
		const applications = await Application.find({ applicant: userId })
			.sort({ createdAt: -1 })
			.populate({
				path: "job",
				options: { sort: { createdAt: -1 } },
				populate: {
					path: "company",
					options: { sort: { createdAt: -1 } },
				},
			});
		if (!applications) {
			return res.status(404).json({
				message: "No applications till now",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Applications fetched successfully",
			applications,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

//get all applicatns for ajob

export const getAllApplicants = async (req, res) => {
	try {
		const jobId = req.params.id;
		const job = await Job.findById(jobId).populate({
			path: "applications",
			options: { sort: { createdAt: -1 } },
			populate: {
				path: "applicant",
			},
		});
		if (!job) {
			return res.status(404).json({
				message: "Job not found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "applicants fetched successfully",
			job,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

export const updateStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const applicationId = req.params.id;
		if (!status) {
			return res.status(400).json({
				message: "status is required",
				success: false,
			});
		}
		const application = await Application.findById(applicationId);
		if (!application) {
			return res.status(404).json({
				message: "Application not found",
				success: false,
			});
		}
		application.status = status;
		await application.save();
		return res.status(200).json({
			message: "Status updated successfully.",
			success: true,
		});
	} catch (e) {
		console.log(e);
		return res.status(400).json({
			message: "some error occured.",
			success: false,
		});
	}
};
