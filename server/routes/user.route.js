import express from "express";
import { logout, register, login,updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import multer from "multer";
import { storage } from "../utils/configCloud.js";
const upload=multer({storage});

const router= express.Router();

router.route("/register").post(upload.single("file"),register);
router.route("/login").post(login);
router.route("/profile/update").post( isAuthenticated,upload.single("file"),updateProfile);
router.route("/logout").get(logout);

export default router;