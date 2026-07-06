import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  getAdminJobS,
} from "../controllers/job.controller.js";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Create Job (Recruiter)
router.route("/post").post(isAuthenticated, createJob);

// Get All Jobs (Public)
router.route("/get").get(getAllJobs);

// Get Single Job By ID
router.route("/get/:jobId").get(isAuthenticated, getJobById);

// Get All Jobs Created By Recruiter/Admin
router.route("/getadminjobs").get(isAuthenticated, getAdminJobS);

export default router;