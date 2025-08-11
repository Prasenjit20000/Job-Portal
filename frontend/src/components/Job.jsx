import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate = useNavigate();
  const calculateDays = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
  }
  return (
    <div className='md:p-5 p-4 border border-gray-100 rounded-md shadow-xl'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-500'>{calculateDays(job?.createdAt)===0?'Today':`${calculateDays(job?.createdAt)} days ago`}</p>
        <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
      </div>

      <div className='flex items-center my-2 gap-2'>
        <Button variant='outline' size='icon' className='p-6'>
          <Avatar>
            {
              job?.company?.logo ? <AvatarImage src={`${job?.company?.logo}`} /> : <AvatarImage src="https://cdn-icons-png.flaticon.com/128/2611/2611445.png" />
            }
            

          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div>
        <Badge variant='ghost' className='text-blue-700 font-bold md:mr-2'>{job?.position} Positions</Badge>
        <Badge variant='ghost' className='text-[#F83002] font-bold md:mr-2'>{job?.jobType}</Badge>
        <Badge variant='ghost' className='text-[#7209b7] font-bold md:mr-2'>{job?.salary}LPA</Badge>
      </div>
      <div className='flex items-center gap-1 md:gap-4 mt-4'>
        <Button variant='outline' className='md:w-20 w-14' onClick={()=>navigate(`/description/${job?._id}`)}><p className='text-xs md:text-base'>Details</p></Button>
        <Button className='bg-[#7209b7] md:w-30 w-22'><p className='text-xs md:text-base'>Save For Later</p></Button>
      </div>
    </div>
  )
}

export default Job