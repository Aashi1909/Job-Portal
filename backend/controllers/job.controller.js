import {Job} from "../models/job.model.js";

export const postJob = async (req, res) => {
    try{
        const {title, description,requirements, location, salary, jobType, position, experience, companyId} = req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !location || !salary || !jobType || !position || !experience || !companyId ){
            return res.status(400).json({message: "All fields are required", success:false});
        }
        const job = await Job.create({title, 
            description,
            requirements: requirements.split(","),
            location, 
            salary,
            jobType,
            position, 
            experienceLevel: experience, 
            company : companyId,
            created_by : userId
        })
        return res.status(201).json({message: "Job Posted successfully", job, success:true});

    }catch(error){

    }
}

