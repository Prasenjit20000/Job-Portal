import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    return (
        <div className='md:max-w-7xl my-20 flex flex-col  mx-20 items-center'>
            <h1 className='md:text-4xl text-2xl font-bold text-center'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>

            {
                // only 6 or less than that jobs will show here 
                allJobs.length <= 0 ? <span className='pt-5'>No Job Available</span> :
                    <div className='grid md:grid-cols-3 grid-cols-1 my-5 gap-4'> {
                        allJobs?.slice(0, 6).map((job) => <LatestJobCard key={job._id} job={job} className="aspect-square md:aspect-auto" />)
                    }
                    </div>
            }
        </div >
    )
}

export default LatestJobs