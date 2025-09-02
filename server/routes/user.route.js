import express from "express";
import { logout, register, login, updateProfile, saveJob, unsaveJob, getSavedJobs } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import multer from "multer";
import { storage } from "../utils/configCloud.js";
const upload=multer({storage});

const router= express.Router();

router.route("/register").post(upload.single("file"),register);
router.route("/login").post(login);
router.route("/profile/update").post( isAuthenticated,upload.single("file"),updateProfile);
router.route("/logout").get(logout);

// Save/Unsave job routes
router.route("/save-job/:jobId").post(isAuthenticated, saveJob);
router.route("/unsave-job/:jobId").delete(isAuthenticated, unsaveJob);
router.route("/saved-jobs").get(isAuthenticated, getSavedJobs);

export default router;