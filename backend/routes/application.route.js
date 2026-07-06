import express from "express";
import {
  applyToJob,
  getUserApplication,
  getApplicants,
  updateApplicationStatus
} from "../controllers/application.controller.js";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Apply for Job
router.route("/apply/:id").get(isAuthenticated, applyToJob);

// Get Logged-in User Applications
router.route("/get").get(isAuthenticated, getUserApplication);

// Get Applicants of a Job
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// Update Application Status
router.route("/status/:id").post(isAuthenticated, updateApplicationStatus);

export default router;