import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { User, LogOut } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constants';
import { setUser } from '../../redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(null));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-20 max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/jobs'>Jobs</Link></li>
                        <li><Link to='/browse'>Browse</Link></li>
                    </ul>
                    {
                        user===null ? (
                            <div className='flex items-center gap-2'>
                                <Link to='/login'><Button variant='outline'>Login</Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button className='bg-[#6A38c2] hover:bg-[#6e26ec]'>Sign Up</Button>

                                </Link>
                            </div>
                        ) : (<Popover>
                            <PopoverTrigger>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={`${user?.profile?.profilePhoto}`} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80'>
                                <div className='flex gap-4'>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={`${user?.profile?.profilePhoto}`} />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium py-0.5'>{user?.fullname}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start mt-2">
                                    <div className='flex justify-center items-center text-gray-600'>
                                        <User size={22} />
                                        <Button variant="link" className="text-gray-600 "><Link to='/profile'>View Profile</Link></Button>
                                    </div>
                                    <div className='flex justify-center items-center text-gray-600'>
                                        <LogOut size={22} />
                                        <Button onClick={logoutHandler} variant="link" className="text-gray-600 cursor-pointer">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar