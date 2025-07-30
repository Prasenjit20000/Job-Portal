import React from 'react'
import LatestJobCard from './LatestJobCard'


const randomJobs = [1, 2, 3, 4, 5, 6, 7]
const LatestJobs = () => {
    return (
        <div className='max-w-7xl my-20 flex flex-col  mx-20 items-center'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
                <div className='grid grid-cols-3 my-5 gap-4'>
                    {
                        // only 6 or less than that jobs will show here 
                        randomJobs.slice(0, 6).map((item, index) => <LatestJobCard />)
                    }
                </div>
        </div>
    )
}

export default LatestJobs