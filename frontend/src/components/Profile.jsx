import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { AvatarImage, Avatar } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

const Profile = () => {
    const isResume = true;
    const [open, setOpen] = useState();
    // retrive logged in user data
    const { user } = useSelector(store => store.auth)
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-45 bg-white border border-gray-200 rounded-2xl my-5 p-8 '>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <div className='flex items-center gap-10 pr-5'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Avatar className='h-12 w-12 cursor-pointer'>
                                        <AvatarImage src={`${user?.profile?.profilePhoto}`} alt='profile' />
                                    </Avatar>
                                </DialogTrigger>
                                <DialogContent className="max-w-xl">
                                    <img
                                        src={user?.profile?.profilePhoto}
                                        alt="Full view"
                                        className="w-full h-auto rounded"
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div>
                            <h1 className='font-bold text-lg'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right border border-gray-600' variant='outline'><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span className='text-sm text-gray-800'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact />
                        <span className='text-sm text-gray-800'>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-2'>
                    <h1 className='font-bold text-md my-1'>Skills</h1>
                    <div className=' flex items-center gap-1'>
                        {

                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) =>
                                <Badge key={index}>{item}</Badge>
                            ) : <span className='text-sm'>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center my-4'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a target='blank' href={`${user?.profile?.resume}`} className='text-gray-700 hover:underline cursor-pointer' >{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <div>
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default Profile