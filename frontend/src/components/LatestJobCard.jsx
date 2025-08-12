import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

const LatestJobCard = ({ job }) => {
    const navigate = useNavigate();
    return (

        <div onClick={() => navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-lg border border-gray-100 cursor-pointer relative z-0 hover:z-10 hover:shadow-2xl hover:scale-105 transition-all duration-300'>
            <div>
                <h1 className='font-medium text-md md:text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold  text-md md:text-lg'>{job?.title}</h1>
                {/* description */}
                <p className='text-sm text-gray-400 pb-2'>{job?.description}</p>
            </div>
            <div className='hidden md:block'>
                <Badge variant='ghost' className='text-blue-700 font-bold'>{job?.position} Positions</Badge>
                <Badge variant='ghost' className='text-[#F83002] font-bold'>{job?.jobType}</Badge>
                <Badge variant='ghost' className='text-[#7209b7] font-bold'>{job?.salary}LPA</Badge>
            </div>
            <div className='md:hidden'>
                <Badge variant='ghost' className='text-blue-700 font-bold'>{job?.position} Positions</Badge>
                <Badge variant='ghost' className='text-[#7209b7] font-bold'>{job?.salary}LPA</Badge>
                <Badge variant='ghost' className='text-[#F83002] font-bold'>{job?.jobType}</Badge>
                
            </div>
        </div>


    )
}

export default LatestJobCard