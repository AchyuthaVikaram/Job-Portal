import express from "express";
import isAuthenticated, { optionalAuth } from "../middlewares/isAuthenticated.js"
import { getAllJobs, getJobsByAdmin, postJob,getJobById } from "../controllers/job.controller.js";
import { validateJobCreation } from "../middlewares/validation.js";
const router= express.Router();

router.route("/post").post(isAuthenticated, validateJobCreation, postJob);
router.route("/get").get(optionalAuth,getAllJobs); // Make public with optional auth
router.route("/admin/get").get(isAuthenticated,getJobsByAdmin);
router.route("/get/:id").get(optionalAuth,getJobById); // Make public with optional auth

export default router;