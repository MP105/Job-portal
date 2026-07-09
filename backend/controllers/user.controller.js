import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

import streamifier from "streamifier";
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
const file = req.file;
const fileUri = getDataUri(file);
const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePhoto = req.file ? req.file.path : "";

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto:cloudResponse.secure_url ,// ✅ SAVE FILE HERE
      },
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password , role} = req.body;
      if (!email || !password  || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email});

    if (!user) {
      return res.status(400).json({
        message: "No user found with this email and role",
        success: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }
    // Check if the role matches
    if (user.role !== role) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }
const token = jwt.sign(
  { userId: user._id },
  process.env.SECRET_KEY,
  { expiresIn: "1d" }
);

console.log("LOGIN USER ID:", user._id);
user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
}  
 return res.status(200).cookie("token", token, {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "none",
}).json({
  message: `Logged in successfully as ${user.fullname}`,
  success: true,
  user,
});
  } catch (error) {
    console.log(error); }
  };
  export const logout = async (req, res) => {
    try {
     res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ 
        message: "Internal Server Error",
        success: false,
      });
    } 
  };

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // create profile if not exists
    if (!user.profile) {
      user.profile = {};
    }

    // update basic info
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    // update skills
    if (skills) {
      user.profile.skills = skills
        .split(",")
        .map((item) => item.trim());
    }


    // upload resume
// upload resume
const file = req.file;

if (file) {
  console.log("Original Name:", file.originalname);
  console.log("Mime Type:", file.mimetype);

  const cloudResponse = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "JobPortal/Resume",
        use_filename: true,
        unique_filename: false,
        filename_override: file.originalname,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });

  console.log("Cloudinary Response:", cloudResponse);

  user.profile.resume = cloudResponse.secure_url;
  user.profile.resumeOriginalName = file.originalname;
}

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Update Profile Error:", error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
