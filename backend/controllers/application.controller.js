import {Application} from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async(req, res) =>{
    try{
        const userId = req.id;
        const jobId = req.params.id
        if(!jobId){
            return res.status(400).json({message:" Job Id is required", success: false})
        }
        //check if the user has already applied for the job 
        const existingApplication = await Application.findOne({job: jobId, applicant: userId})
        if(existingApplication){
            return res.status(400).json({message:"You have already for this Job", success: false})
        }
        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({message:"Job not Found", success: false})
        }
        // create a new application
        const newApplication = await Application.create({job: jobId, applicant:userId})
        job.applications.push(newApplication._id)
        await job.save();
        return res.status(200).json({message:"Job Applied Successfully", success:true})
    }catch(error){

    }
}

export const getAppliedJobs = async(req, res) =>{
    try{
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job", 
            options:{sort:{createdAt: -1}},
            populate:{
                path : 'company',
                options:{sort:{createdAt: -1}}
            }
        })
        if(!application){
            return res.status(400).json({message:"Application not Found", success: false})
        }
        return res.status(200).json({message:"Application Fetched Successfully", application, success:true})

    }catch(error)
    {

    }
}
// Admin can view that how many applicants have applied for the application
export const getApplicants = async(req, res) =>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path : 'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path: 'applicant',
            }
        })
        if(!job){
            return res.status(400).json({message:"Job not Found", success: false})
        }
        return res.status(200).json({message:"Application Fetched Successfully", job, success:true})
    }catch(error)
    {

    }
}