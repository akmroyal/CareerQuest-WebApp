import { Application } from "../models/application.model.js";
import {Job} from "../models/job.model.js";

export const applyJob = async (req,res) => {
    try{
        const userId= req.id;
        const jobId = req.params.id;
        if(!jobId) {return res.status(400).json({
            message:"Job id is required",
            success: false
       })
    }
    //Check If Already Applied For The Job
    const existingApplication = await Application.findOne({job:jobId, applicant:userId});
    if(existingApplication){
        return res.status(400).json({
            message:"You have already applied for this job",
            success: false
       });
    }

    //Check If The Job Exists
    const job = await Job.findById(jobId);
    if(!job){
        return res.status(404).json({
            message:"Job not found",
            success: false
       });
    }

    //Create New Application
    const newApplication = await Application.create({
        job:jobId,
        applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(200).json({
        message:"Application submitted successfully",
        application: newApplication,
        success: true
    });

}

    catch(err){
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

export const getAppliedJobs = async (req,res) => {
    try{
        const userId = req.id;
        const application = await Application.find({applicant: userId}).sort({createdAt:-1}).populate
        ({
            path: "job",
            options: {sort:{createdAt:-1}},
            populate: {
                path: "company",
                options: {sort:{createdAt:-1}}
            }
        })
        if(!application){
            return res.status(404).json({
                message:"No Applications Found",
                success: false
            });
        }

        return res.status(200).json({
            message:"Applied Jobs",
            application,
            success: true
        });


    }
    catch(err){
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
            },
        });
        
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } 
    catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

export const updateStatus = async (req,res) => {
    try{
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "Status is required",
                success: false,
            });
        }
        //Find The Applicayion By Applicant Id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message: "Application not found",
                success: false,
            });
        };

        //Update The Status
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: "Application status updated successfully",
            application,
            success: true,
        });
    }
    catch(err){
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}