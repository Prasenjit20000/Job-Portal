import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { AvatarImage, Avatar } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'

const skillSet = ['HTML', 'CSS', 'JavaScript', 'React'];


const Profile = () => {
    const isResume = true;
    const [open,setOpen] = useState();
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-45 bg-white border border-gray-200 rounded-2xl my-5 p-8 '>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <div className='flex items-center gap-4'>
                            <Avatar className='h-24 w-24'>
                                <AvatarImage src='https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg' alt='profile' />
                            </Avatar>
                        </div>
                        <div>
                            <h1 className='font-bold text-lg'>Full Name</h1>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, et!</p>
                        </div>
                    </div>
                    <Button onClick={()=>setOpen(true)} className='text-right border border-gray-600' variant='outline'><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span className='text-sm text-gray-800'>abc@gmail.com</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact />
                        <span className='text-sm text-gray-800'>0000000000</span>
                    </div>
                </div>
                <div className='my-2'>
                    <h1 className='font-bold text-md my-1'>Skills</h1>
                    <div className=' flex items-center gap-1'>
                        {
                            skillSet.length != 0 ? skillSet.map((item, index) =>
                                <Badge key={index}>{item}</Badge>
                            ) : <span className='text-sm'>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center my-4'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a target='blank' href="https://www.youtube.com" className='text-gray-700 hover:underline cursor-pointer' >Resume Name</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable/>
            </div>
            <div>
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default Profile