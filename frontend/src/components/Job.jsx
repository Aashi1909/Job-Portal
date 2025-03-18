import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from "react-router-dom";


const Job = ({job}) => {
    const navigate = useNavigate();
    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 ">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">2 days ago</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>
            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium textlg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-600">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-semibold text-lg my-2 ">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            <div className='flex items-center mt-4 gap-2'>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.position}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#F83002]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job;