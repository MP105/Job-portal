import express from "express";
import {
  register,
  login,
  updateProfile,
  logout
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/uploads.js";

const router = express.Router();

// ✅ REGISTER WITH FILE UPLOAD
router.post("/register", upload.single("file"), register);

// LOGIN
router.post("/login", login);

// LOGOUT
router.get("/logout", logout);

// UPDATE PROFILE
router.put(
  "/profile/update",
  isAuthenticated,
  upload.single("file"),
  updateProfile
);
export default router;