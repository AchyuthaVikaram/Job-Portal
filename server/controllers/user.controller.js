import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phno, password, role } = req.body;

    // Check if all required fields are present
    if (!fullname || !email || !phno || !password || !role) {
      return res.status(400).json({
        message: "All fields are mandatory!!",
        success: false,
      });
    }

    // Check if the user already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with the provided email",
        success: false,
      });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 15);

    // Create new user object
    user = new User({
      fullname,
      email,
      phno,
      password: hashedPass,
      role,
    });

    // Check if a file was uploaded and attach the profile photo
    if (req.file) {
      const photo = req.file.path; // Path of the uploaded file
      user.profile.profilePhoto = photo; // Assuming the profilePhoto field exists in the profile object
    }

    // Save the new user to the database
    await user.save();

    return res.status(200).json({
      message: "User registered successfully",
      success: true,
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error occurred during registration",
      success: false,
    });
  }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate the fields
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are mandatory!",
                success: false,
            });
        }

        // Check if user exists
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist, please register.",
                success: false,
            });
        }

        // Compare the password
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect password entered.",
                success: false,
            });
        }

        // Check if the role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role.",
                success: false,
            });
        }

        // Create token payload and sign the JWT
        const tokenData = {
            userId: user._id,
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d", // Token expires in 1 day
        });

        // Prepare user object to send back
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phno: user.phno,
            role: user.role,
            profile: user.profile,
        };

        // Send response with the token in a cookie
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day expiration
                httpOnly: true, // Ensures the cookie is accessible only by the web server
                secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
                sameSite: "strict", // Strict same-site policy
            })
            .json({
                message: `Welcome back, ${user.fullname}!`,
                user,
                success: true,
            });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Server error during login!",
            success: false,
        });
    }
};


export const logout = async (req, res) => {
	try {
		return res.status(200).cookie("token", "", { maxAge: "0" }).json({
			message: "logged out successfully!",
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { fullname, email, phno, bio, skills } = req.body;
		let skillsArray = skills ? skills.split(","):[] ;
	
		let id=req.user._id;
		let user = await User.findById(id);
		if (!user) {
			return res.status(400).json({
				message: "User not found.",
				success: false,
			});
		}
		// updating data
		if (fullname) user.fullname = fullname;
		if (email) user.email = email;
		if(phno) user.phno=phno;
		if (bio) user.profile.bio = bio;
		if (skills) user.profile.skills = skillsArray;
		if (req.file) {
			const resume = req.file.path;
			const resumeOriginalName =req.file.originalname;

      		user.profile.resume = resume;
			user.profile.resumeOriginalName=resumeOriginalName;
		}

		await user.save();

		user = {
			_id: user._id,
			fullname: user.fullname,
			email: user.email,
			phno: user.phno,
			role: user.role,
			profile: user.profile,
		};

		return res.status(200).json({
			message: "Profile updated successfully.",
			user,
			success: true,
		});
	} catch (e) {
		console.log(e);
	}
};

export const saveJob = async (req, res) => {
	try {
		const { jobId } = req.params;
		const userId = req.user._id;

		// Check if job exists
		const Job = await import("../models/job.model.js");
		const job = await Job.default.findById(jobId);
		if (!job) {
			return res.status(404).json({
				message: "Job not found",
				success: false,
			});
		}

		// Check if user exists
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}

		// Check if job is already saved
		if (user.savedJobs.includes(jobId)) {
			return res.status(400).json({
				message: "Job is already saved",
				success: false,
			});
		}

		// Add job to saved jobs
		user.savedJobs.push(jobId);
		await user.save();

		return res.status(200).json({
			message: "Job saved successfully",
			success: true,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			message: "Server error while saving job",
			success: false,
		});
	}
};

export const unsaveJob = async (req, res) => {
	try {
		const { jobId } = req.params;
		const userId = req.user._id;

		// Check if user exists
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}

		// Check if job is saved
		if (!user.savedJobs.includes(jobId)) {
			return res.status(400).json({
				message: "Job is not saved",
				success: false,
			});
		}

		// Remove job from saved jobs
		user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
		await user.save();

		return res.status(200).json({
			message: "Job removed from saved jobs",
			success: true,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			message: "Server error while removing job",
			success: false,
		});
	}
};

export const getSavedJobs = async (req, res) => {
	try {
		const userId = req.user._id;

		// Get user with populated saved jobs
		const user = await User.findById(userId).populate({
			path: 'savedJobs',
			populate: {
				path: 'company',
				select: 'name logo'
			}
		});

		if (!user) {
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "Saved jobs retrieved successfully",
			savedJobs: user.savedJobs,
			success: true,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			message: "Server error while retrieving saved jobs",
			success: false,
		});
	}
};
