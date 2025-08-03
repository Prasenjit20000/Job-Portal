import React from 'react'
import { Badge } from "@/components/ui/badge"

const LatestJobCard = ({job}) => {
    return (
        
            <div className='p-5 rounded-md shadow-lg border border-gray-100 cursor-pointer relative z-0 hover:z-10 hover:shadow-2xl hover:scale-105 transition-all duration-300'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg'>{job?.title}</h1>
                {/* description */}
                <p className='text-sm text-gray-400 pb-2'>{job?.description}</p>
            </div>
            <div>
                <Badge variant='ghost' className='text-blue-700 font-bold'>{job?.position}</Badge>
                <Badge variant='ghost' className='text-[#F83002] font-bold'>{job?.jobType}</Badge>
                <Badge variant='ghost' className='text-[#7209b7] font-bold'>{job?.salary}</Badge>
            </div>
        </div>
        
        
    )
}

export default LatestJobCard