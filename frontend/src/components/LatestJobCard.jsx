import React from 'react'
import { Badge } from "@/components/ui/badge"

const LatestJobCard = () => {
    return (
        
            <div className='p-5 rounded-md shadow-lg border border-gray-100 cursor-pointer relative z-0 hover:z-10 hover:shadow-2xl hover:scale-105 transition-all duration-300'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg'>Job Title</h1>
                {/* description */}
                <p className='text-sm text-gray-400 pb-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, delectus.</p>
            </div>
            <div>
                <Badge variant='ghost' className='text-blue-700 font-bold'>
                    12 Positions
                </Badge>
                <Badge variant='ghost' className='text-[#F83002] font-bold'>
                     Part Time
                </Badge>
                <Badge variant='ghost' className='text-[#7209b7] font-bold'>
                    24 LPA
                </Badge>
            </div>
        </div>
        
        
    )
}

export default LatestJobCard