import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#F83002]'>Dream Job</span></h1>
        <p>lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Quasi, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input type="text" placeholder='Search for jobs' className='outline-none  w-full' />
            <Button className="rounded-r-full"> <Search className='h-5 w-5' /></Button>
        </div>
        </div>
      
    </div>
  )
}

export default HeroSection
