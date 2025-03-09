import { Badge } from './ui/badge'
import React from 'react'

const LatestJobCards = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer  '>
        <div>
        <h1 className='font-medium text-lg'>Company Name</h1>
        <p className='text-sm text-gray-500 '>India</p>
        </div>
        <div>
            <h1 className='font-semibold text-medium my-2'>Job Title</h1>
            <p className='text-sm text-gray-600'>lorem ipsum dolor  oiuyghj oiuygtfv lkjhbv </p>
        </div>
        <div className='flex items-center mt-4 gap-2'>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">12 Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">Full Time</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">12 LPA</Badge> 
        </div>
      
    </div>
  )
}

export default LatestJobCards
