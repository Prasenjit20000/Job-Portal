import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constants';

const shortlistingStatus = ['Accepted', "Rejected"];
const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const statusHandler = async (status,applicationId) => {
        try {
            // axios.defaults.withCredentials = true;
            const res = await  axios.put(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`, { status }, { withCredentials: true });
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of users applied for this job.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => {
                            return (
                                <tr key={item?._id}>
                                    <TableCell>{item?.applicant?.fullname}</TableCell>
                                    <TableCell>{item?.applicant?.email}</TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                    <TableCell >
                                        {
                                            item?.applicant?.profile?.resume ?
                                                <a className='text-blue-600' href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferrer'>{item?.applicant?.profile?.resumeOriginalName}</a>
                                                :
                                                <span>NA</span>
                                        }
                                    </TableCell>
                                    <TableCell>{item?.createdAt.split('T')[0]}</TableCell>
                                    <TableCell className='text-right'>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className='cursor-pointer' />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-32'>
                                                {
                                                    shortlistingStatus.map((status, index) => {
                                                        return (
                                                            <div className='flex w-fit items-center my-2 cursor-pointer' onClick={()=>statusHandler(status,item?._id)} key={index}>
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            )
                        })
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable