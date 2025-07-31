import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { DialogClose, DialogFooter } from './ui/dialog'
import { Loader2, X } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from './utils/constants'
import { toast } from 'sonner'
import { setUser } from '../redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const closeHandler = (e) => {
        e.preventDefault();
        setOpen(false)
    }
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills,
        file: user?.profile?.resume
    })
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Entering submit Hander")
        // updated data send to database
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        console.log(input)
        console.log(formData)
        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            });
            if (res.data.success) {
                // updated user will set in redux-store
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        setOpen(false);
    }

    return (

        <div>
            <Dialog open={open} >
                <DialogContent onInteractOutside={() => setOpen(false)}>
                    <DialogHeader >
                        <div className='flex justify-between'>
                            <DialogTitle className=' text-2xl'>Update Profile</DialogTitle>
                            <X className='cursor-pointer text-gray-400 hover:text-black' onClick={closeHandler} />
                        </div>

                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid pb-4'>
                            {/* in html forms for every inputs and corresponding labels have same id */}
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='px-12 text-md '>Name</Label>
                                    <Input

                                        id="name"
                                        name="name"
                                        type="text"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        className='col-span-3 border border-gray-500'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='email' className='px-12 text-md '>Email</Label>
                                    <Input

                                        id="email"
                                        name="email"
                                        type="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className='col-span-3 border border-gray-500'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='number' className='px-12 text-md '>Number</Label>
                                    <Input

                                        id="number"
                                        name="number"
                                        type="text"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className='col-span-3 border border-gray-500'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='bio' className='px-12 text-md '>Bio</Label>
                                    <Input

                                        id="bio"
                                        name="bio"
                                        type="text"
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                        className='col-span-3 border border-gray-500'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='skills' className='px-12 text-md'>Skills</Label>
                                    <Input

                                        id="skills"
                                        name="skills"
                                        type="text"
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                        className='col-span-3 border border-gray-500'
                                    />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='email' className='px-12 text-md '>Resume</Label>
                                    <Input

                                        id="file"
                                        name="file"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={fileChangeHandler}
                                        className='col-span-3 border border-gray-500'
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant='outline' onClick={closeHandler} className='border border-gray-400 w-1/3'>Close</Button>
                            {
                                loading ?
                                    <Button className='w-1/2'><Loader2 className='animate-spin' />Please wait</Button> :
                                    <Button type='submit' className='w-1/3'>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog