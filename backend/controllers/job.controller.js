import express from 'express';
import { Job } from '../models/job.model.js';
export const createJob = async (req, res) => {
    try {
        const { title, description, requirements ,location, jobType, salary , experience , position ,companyId} = req.body; 
        const userId = req.id; 
        if (!title || !description || !location || !salary || !companyId || !jobType || !experience || !position || !requirements ) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const job = await Job.create({
            title,
            description,
            location,
            salary: Number(salary),
            company: companyId,
            jobType,
            experienceLevel: experience,
            position,
            requirements: requirements.split(','),
            created_by: userId,
        });
        return res.status(201).json({
            message: "Job created successfully",
            success: true,
            job,
        });
    } catch (error) {
    console.error("Create Job Error:", error);

    return res.status(500).json({
        message: error.message,
        success: false,
    });
}
};
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    const jobs = await Job.find(query).populate("company");

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Populate Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId)
      .populate("company", "name")
      .populate({
        path: "applicants",
        populate: {
          path: "applicant",
          select: "_id fullname email profile",
        },
      });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job details fetched successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
//recruiters can get job details
export const getAdminJobS = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({
            created_by: adminId
        }).populate("company", "name");

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Admin jobs fetched successfully",
            success: true,
            jobs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};