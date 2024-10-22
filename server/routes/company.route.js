import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import multer from "multer";
import { storage } from "../utils/configCloud.js";
const upload=multer({storage});
const router= express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").post(isAuthenticated,upload.single("file"),updateCompany);

export default router;