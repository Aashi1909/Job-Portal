import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_URL, APPLICATION_API_URL } from "../utils/constant";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


const JobDescription = () => {
    const isApplied = singleJob?.applications?.some(application=>application.applicant == user?._id) || false;
    const params = useParams();
    const jobId = params.id;
    const {singleJob} = useSelector(store=>store.job)
    const {user} = useSelector(store =>store.auth)
    const dispatch = useDispatch(); 

    const applyJobHandler = async() => {
        try{
            const res = await axios.post(`${APPLICATION_API_URL}/apply/${jobId}`, {
                withCredentials: true
            })
                if(res.data.success){
                    toast.success(res.data.message);
                }
                
            
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
            
        }
    }

    useEffect(() => {
        const fetchSingleJob = async() =>{
            try{
                const res = await axios.get(`${JOB_API_URL}/get/${jobId}`, {
                    withCredentials: true
                })
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job))

                }

            }catch(error)
            {
                console.log(error)
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id])

    return (
        <div className="max-w-7xl mx-auto my-10 ">
            <div className="flex items-center justify-between ">
                <div >
                    <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                    <div className='flex items-center mt-4 gap-2'>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType} </Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                {isApplied ? (<Button disabled={isApplied} className="text-md font-semibold text-white  bg-gray-600 rounded-lg" variant="outline">Already Applied</Button>
                ) : (
                    <Button onClick={applyJobHandler} className="bg-[#F83002] hover:bg-red-700">Apply Now</Button>
                )}
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
            <div className="my-4">
                <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title} </span> </h1>
                <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span> </h1>
                <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description} </span> </h1>
                <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience}  years</span> </h1>
                <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span> </h1>
                <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span> </h1>
                <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span> </h1>

            </div>
        </div>
    )
}

export default JobDescription