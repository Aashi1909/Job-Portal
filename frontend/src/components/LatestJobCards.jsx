import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import React from 'react'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/description/${job?._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer  '>
        <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500 '>India</p>
        </div>
        <div>
            <h1 className='font-semibold text-medium my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center mt-4 gap-2'>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.position} Position</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.salary} LPA</Badge> 
        </div>
      
    </div>
  )
}

export default LatestJobCards
