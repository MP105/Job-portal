import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Apply Job
export const applyToJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      applicant: userId,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied to this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const newApplication = await Application.create({
      applicant: userId,
      job: jobId,
    });

    job.applicants.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Application submitted successfully",
      success: true,
      application: newApplication,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Get Logged-in User Applications
export const getUserApplication = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({
      applicant: userId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      applications: applications || [],
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Applicants of a Job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applicants",
      populate: {
        path: "applicant",
        select: "fullname email phoneNumber profile",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      applicants: job.applicants,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Update Application Status
export const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const applicationData = await Application.findById(applicationId);

    if (!applicationData) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    applicationData.status = status.toLowerCase();

    await applicationData.save();

    return res.status(200).json({
      message: "Application status updated successfully",
      success: true,
      application: applicationData,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};