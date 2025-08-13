import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUrl from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }

        let company = await Company.findOne({
            name: { $regex: `^${companyName}$`, $options: 'i' }
        });

        if (company) {
            return res.status(400).json({
                message: "Company already exist.",
                success: false
            })
        }
        // here we don't  check the role of user so a student also create a company
        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        await company.save();
        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req, res) => {
    try {
        // extract companies creted by logged in users
        const userId = req.id;
        const companies = await Company.find({ userId });

        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        // req.params.id -> give in the url
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        const companyId = req.params.id;
        let company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }


        const updatedData = { name, description, website, location, logo: company.logo }
        if (file) {
            const fileUri = getDataUrl(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            const logo = cloudResponse.secure_url;
            updatedData.logo = logo;
        }
        // this will update and save company details
        company = await Company.findByIdAndUpdate(companyId, updatedData, { new: true });
        // await company.save();

        return res.status(200).json({
            message: "Company information updated",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}