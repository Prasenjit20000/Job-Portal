import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUrl from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {

        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;
        const fileUri = getDataUrl(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        // if any field is empty or not found 
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: false
            });
        }

        // check this email is already present or not
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email.",
                success: false
            });
        }

        // directly not store the passwords for security
        // so first we use bcrypt and salt the password and then store in the password
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        })
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: " false"
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            })
        }
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't with current role.",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            // password: user.password,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "None" }).json({
            message: `Welcome back ${user.fullname}`,
            user,  //here i send user also which store in redux-store in frontend for maintain the states
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfilePhoto = async (req,res) =>{
    try {
        const file = req.file
        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: true
            });
        }
        if (file) {
            const fileURI = getDataUrl(file);
            const cloudResponse = await cloudinary.uploader.upload(fileURI.content);
            if (cloudResponse) {
                // save the cloudinary url
                user.profile.profilePhoto = cloudResponse.secure_url;
            }
        }
        await user.save();   //save in database

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: 'Profile photo updated successfully.',
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file
        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: true
            });
        }

        // all test cases pass mean user data found successfully
        // updating data--->only which attributes accepted as request those are updated
        // increase TC
        if (fullname) {
            user.fullname = fullname
        }
        if (email) {
            user.email = email
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber
        }
        if (bio) {
            user.profile.bio = bio
        }
        if (skills) {
            const skillsArray = skills.split(",");
            user.profile.skills = skillsArray
        }
        if (file) {
            const fileURI = getDataUrl(file);
            const cloudResponse = await cloudinary.uploader.upload(fileURI.content, {
                resource_type: "raw", //this is important for non-image files like PDFs
            });
            if (cloudResponse) {
                // save the cloudinary url
                user.profile.resume = cloudResponse.secure_url;
                // save the original resume name
                user.profile.resumeOriginalName = file.originalname;
            }
        }


        await user.save();   //save in database

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: 'Profile updated successfully.',
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}