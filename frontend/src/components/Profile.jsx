import React, { useRef, useState } from 'react'
import Navbar from './shared/Navbar'
import { AvatarImage, Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Loader2, Mail, Pen, X } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import useGetAppliedJob from '../hooks/useGetAppliedJob'
import { DialogClose } from './ui/dialog'
import Footer from './Footer'
import { USER_API_END_POINT } from './utils/constants'
import { toast } from 'sonner'
import axios from 'axios'
import { setLoading, setUser } from '../redux/authSlice'

const Profile = () => {
    useGetAppliedJob();
    const dispatch = useDispatch();
    const isResume = true;
    const [open, setOpen] = useState();
    // retrive logged in user data
    const { user, loading } = useSelector(store => store.auth);
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Open file picker
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        try {
            dispatch(setLoading(true));
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post(`${USER_API_END_POINT}/profile/photo/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    return (
        <div>
            <Navbar />
            <div className='md:hidden m-4  w-[90%] h-auto p-4 border border-gray-300 rounded-2xl shadow-lg'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <div className='flex items-center gap-10 pr-5'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Avatar className='h-12 w-12 cursor-pointer'>
                                        {
                                            user.profile.profilePhoto ? <AvatarImage src={`${user?.profile?.profilePhoto}`} /> : <AvatarImage src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png' />
                                        }
                                    </Avatar>
                                </DialogTrigger>
                                <DialogContent className="w-full h-auto">
                                    <div className="relative">
                                        {/* Close button in top-right */}
                                        <DialogClose className="absolute top-2 right-2 bg-white/70 rounded-full p-1 hover:bg-white">
                                            <X className="w-5 h-5" />
                                        </DialogClose>

                                        {/* Image */}
                                        {
                                            user.profile.profilePhoto ?
                                                <img
                                                    src={user?.profile?.profilePhoto}
                                                    className="w-auto h-auto rounded"
                                                /> :
                                                <img
                                                    src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'
                                                    className="w-auto h-auto rounded"
                                                />
                                        }
                                    </div>
                                    <div>
                                        {
                                            loading ?
                                                <Button className='w-1/2'><Loader2 className='animate-spin' />Please wait</Button> :
                                                <Button onClick={handleButtonClick}>Update Profile Image</Button>
                                        }
                                        {/* Hidden file input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: "none" }}
                                        />
                                    </div>
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
                    <div className=' flex flex-wrap gap-2'>
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
            {/* ===================================== */}
            <div className='hidden md:block md:max-w-4xl mx-45 bg-white border border-gray-300 rounded-2xl my-5 p-8  shadow-lg'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <div className='flex items-center gap-10 pr-5'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Avatar className='h-12 w-12 cursor-pointer'>
                                        {
                                            user.profile.profilePhoto ? <AvatarImage src={`${user?.profile?.profilePhoto}`} /> : <AvatarImage src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png' />
                                        }
                                    </Avatar>
                                </DialogTrigger>
                                <DialogContent className="w-auto">
                                    <div className="relative">
                                        {/* Close button in top-right */}
                                        <DialogClose className="absolute top-2 right-2 bg-white/70 rounded-full p-1 hover:bg-white cursor-pointer">
                                            <X className="w-5 h-5" />
                                        </DialogClose>

                                        {/* Image */}
                                        {
                                            user.profile.profilePhoto ?
                                                <img
                                                    src={user?.profile?.profilePhoto}
                                                    className="w-auto h-90 rounded"
                                                /> :
                                                <img
                                                    src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'
                                                    className="w-auto h-90 rounded"
                                                />
                                        }
                                    </div>
                                    <div>
                                        {
                                            loading ?
                                                <Button className='w-1/2'><Loader2 className='animate-spin' />Please wait</Button> :
                                                <Button onClick={handleButtonClick}>Update Profile Image</Button>
                                        }
                                        {/* Hidden file input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div>
                            <h1 className='font-bold text-lg'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right border border-gray-600 cursor-pointer' variant='outline'><Pen /></Button>
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
                <h1 className='font-bold text-lg pl-5 my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <div>
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
            <Footer />
        </div>
    )
}

export default Profile