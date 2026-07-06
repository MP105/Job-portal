import express from "express";
import {Company} from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async (req, res) => {

    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }
        let company = await Company.findOne({ name : companyName });

        if (company) {
            return res.status(400).json({
                message: "Company already exists with this name",
                success: false,
            });
        }
        company = await Company.create({ name: companyName, userId: req.id });

        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};
export const getCompanyDetails = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Companies fetched successfully",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const getCompanyById = async (req, res) => {
    try {
        const { companyId } = req.params;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Company details fetched successfully",
            success: true,
            company,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, website, location } = req.body;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Sirf owner hi update kar sake
    if (company.userId.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Duplicate name check
    if (name && name !== company.name) {
      const existingCompany = await Company.findOne({ name });

      if (existingCompany) {
        return res.status(400).json({
          success: false,
          message: "Company name already exists",
        });
      }

      company.name = name;
    }

    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;

    // Logo Upload (optional)
    if (req.file) {
      const fileUri = getDataUri(req.file);

      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content,
        {
          folder: "JobPortal/CompanyLogo",
        }
      );

      company.logo = cloudResponse.secure_url;
    }

    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    if (company.userId.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Company.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};