import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'


const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job)
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-bold'><span className='text-[#F83002]'>Latest & Top </span>Job Openings</h1>
        <div className='grid grid-cols-3 gap-4 my-5'>
        {
            allJobs.length <= 0? <span>No Jobs Available</span> : allJobs.slice(0,6).map((item) => (
                <LatestJobCards key={item._id} job={item} />
            ))
        }

        </div>
      
    </div>
  )
}

export default LatestJobs
