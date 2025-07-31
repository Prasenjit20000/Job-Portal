import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDescription = () => {
    const isApplied = false;
    return (
        <div className='max-w-7xl mx-45 my-10'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Title</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge variant='ghost' className='text-blue-700 font-bold'>12 Positions</Badge>
                        <Badge variant='ghost' className='text-[#F83002] font-bold'>Part Time</Badge>
                        <Badge variant='ghost' className='text-[#7209b7] font-bold'>24 LPA</Badge>
                    </div>
                </div>

                {
                    isApplied ? <Button className='bg-green-400 cursor-not-allowed'>Already Applied</Button> : <Button className='bg-[#7209b7] hover:bg-[#4d077c] hover:cursor-pointer'>Apply Now</Button>
                }
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='py-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
            </div>
        </div>
    )
}

export default JobDescription