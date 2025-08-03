import React from 'react'
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
    <div className='p-5 border border-gray-100 rounded-md shadow-xl'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-500'>{calculateDays(job.createdAt)===0?'Today':`${calculateDays(job.createdAt)} days ago`}</p>
        <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
      </div>

      <div className='flex items-center my-2 gap-2'>
        <Button variant='outline' size='icon' className='p-6'>
          <Avatar>
            <AvatarImage src="	https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
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
        <Badge variant='ghost' className='text-blue-700 font-bold'>{job?.position}</Badge>
        <Badge variant='ghost' className='text-[#F83002] font-bold'>{job?.jobType}</Badge>
        <Badge variant='ghost' className='text-[#7209b7] font-bold'>{job?.salary}</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant='outline' onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
        <Button className='bg-[#7209b7]'>Save For Later</Button>
      </div>
    </div>
  )
}

export default Job