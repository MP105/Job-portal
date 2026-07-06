import express from "express";
import {
  registerCompany,
  getCompanyDetails,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller.js";
import { upload } from "../middlewares/uploads.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

// Register Company
router.route("/register").post(isAuthenticated, registerCompany);

// Get Logged In User Company
router.route("/get").get(isAuthenticated, getCompanyDetails);

// Get Company By ID
router.route("/get/:companyId").get(isAuthenticated, getCompanyById);

// Update Company
router.put(
  "/update/:id",
  isAuthenticated,
  upload.single("file"),
  updateCompany
);
//delete company//
router.route("/delete/:id").delete(isAuthenticated, deleteCompany);
export default router;