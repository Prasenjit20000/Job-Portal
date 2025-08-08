import { Job } from "../models/job.model.js";

// recruiter post jobs/creates
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                status: false
            })
        }
        const userId = req.id;
        let job = await Job.findOne({ title: title,company:companyId });
        if (job) {
            return res.status(400).json({
                message: "You can't register same job post for same company.",
                success: false
            })
        }

        job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(200).json({
            message: "New job created.",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

// all jobs show to students
export const getAllJobs = async (req, res) => {
    try {
        // this works as both->one to get all jobs(don't send anything as query parameters) and another is fitering jobs and send to students
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        // here inside the jobs we found the company whose job it is and also found the userId who created this job.
        // and using populate method we can show the deatils of company and user
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ created_by: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// particular a job show to students
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Job founded successfully.",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// all jobs created by a particular recruiter
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company"
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}