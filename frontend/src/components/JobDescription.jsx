import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";


const JobDescription = () => {
    const isApplied = true;
    const params = useParams()
    return (
        <div className="max-w-7xl mx-auto my-10 ">
            <div className="flex items-center justify-between ">
                <div >
                    <h1 className="font-bold text-xl">Frontend Developer</h1>
                    <div className='flex items-center mt-4 gap-2'>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">12 Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">Full Time</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">12 LPA</Badge>
                    </div>
                </div>
                {isApplied ? (<Button disabled={isApplied} className="text-md font-semibold text-white  bg-gray-600 rounded-lg" variant="outline">Already Applied</Button>
                ) : (
                    <Button className="bg-[#F83002] hover:bg-red-700">Apply Now</Button>
                )}
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
            <div className="my-4">
                <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">Frontend Developer</span> </h1>
                <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">Hyderabad</span> </h1>
                <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, qui?</span> </h1>
                <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">2 years</span> </h1>
                <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">12LPA</span> </h1>
                <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">10</span> </h1>
                <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">11-03-2025</span> </h1>

            </div>
        </div>
    )
}

export default JobDescription