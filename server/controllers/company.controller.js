import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {
	try {
		const { name } = req.body;
	
		if (!name) {
			res.status(400).json({
				message: "Company name is required!",
				success: false,
			});
		}
		let company = await Company.findOne({ name: name });
		if (company) {
			res.status(400).json({
				message: `${name} is alredy registered!`,
				Success: false,
			});
		}
		company = await Company.create({ name: name, userId: req.user._id });
		res.status(200).json({
			message: "Company registered successfully!",
			company,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

export const getCompany = async (req, res) => {
	try {
		const userId = req.user._id; //user must be authenticated & authorized
		const companies = await Company.find({ userId: userId });

		res.status(200).json({
			message: `Companies fetched `,
			companies,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

//get company by id
export const getCompanyById = async (req, res) => {
	try {
		console.log(req.params);
		const id = req.params.id;
		const company = await Company.findById(id);
		if (!company) {
			res.status(404).json({
				message: `Company doesn't found`,
				success: false,
			});
		}
		res.status(200).json({
			message: `${company.name} Company found`,
			company,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

export const updateCompany = async (req, res) => {
	try {
		const id = req.params.id;
		
		const { name, description, website, location } = req.body;
		const updatedData = { name, description, website, location };
		const company = await Company.findByIdAndUpdate(id, updatedData, {
			new: true,
		});
		if (!company) {
			res.status(404).json({
				message: `Company not found`,
				success: false,
			});
		}
		if(req.file){
			const logo= req.file.path;
			company.logo=logo;
		}
		await company.save();
		return res.status(200).json({
			message: `${company.name} information updated successfully`,
			company,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};
