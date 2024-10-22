import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary API keys
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

// Define the storage configuration
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "jobHunt_dev", // Folder in Cloudinary where files will be stored
		allowedFormats: ["png", "jpg", "jpeg", "pdf", "doc", "docx", "rtf"], // Allowed formats for profile photos and resumes
	},
});

// Export cloudinary and storage for use in other parts of the app
export { cloudinary, storage };
