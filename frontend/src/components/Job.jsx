import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

const Job = () => {
  const navigate = useNavigate()
  const jobId = 'wensdbvjhdsskns'
  return (
    <div className='p-5 border border-gray-100 rounded-md shadow-xl'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-500'>2 days ago</p>
        <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>

      </div>

      <div className='flex items-center my-2 gap-2'>
        <Button variant='outline' size='icon' className='p-6'>
          <Avatar>
            <AvatarImage src="	https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>Company Name</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sunt ullam ea quaerat. Autem impedit nemo numquam quod itaque! Consectetur.</p>
      </div>
      <div>
        <Badge variant='ghost' className='text-blue-700 font-bold'>12 Positions</Badge>
        <Badge variant='ghost' className='text-[#F83002] font-bold'>Part Time</Badge>
        <Badge variant='ghost' className='text-[#7209b7] font-bold'>24 LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant='outline' onClick={()=>navigate(`/description/${jobId}`)}>Details</Button>
        <Button className='bg-[#7209b7]'>Save For Later</Button>
      </div>
    </div>
  )
}

export default Job