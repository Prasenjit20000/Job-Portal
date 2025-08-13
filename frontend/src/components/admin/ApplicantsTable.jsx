import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, Loader2, MoreHorizontal, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constants';
import { useState } from 'react';
import {Badge} from '../ui/badge'
import { setReload } from '../../redux/applicationSlice';

const shortlistingStatus = ['Accepted', "Rejected"];
const ApplicantsTable = () => {
    const {reload} = useSelector(store=>store.application);
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    const [acceptLoading, setAcceptLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);
    const statusHandler = async (status, applicationId) => {
        status === 'Accepted' ? setAcceptLoading(true) : setRejectLoading(true);
        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            setAcceptLoading(false);
            setRejectLoading(false);
            dispatch(setReload(!reload));
        }
    }
    return (
        <div>
            <Table>
                {
                    applicants.length <= 0 ?
                        <TableCaption>Applicants for this job</TableCaption>
                        : <TableCaption>Applicants for this job</TableCaption>
                }
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-center'>Status</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants?.applications?.map((item) => {
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
                                    <TableCell className='text-center'>
                                        {
                                            item?.status.toLowerCase() === "rejected" ? <Badge variant='destructive'>Rejected</Badge>
                                            : item?.status.toLowerCase() === "accepted" ? <Badge className='bg-green-600 text-white'>Accepted</Badge> : <Badge variant='default'>Pending</Badge> 
                                        }
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className='cursor-pointer' />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-32'>
                                                {
                                                    shortlistingStatus.map((status, index) => {
                                                        return (
                                                            <div className='flex w-fit items-center my-2 cursor-pointer' onClick={() => statusHandler(status, item?._id)} key={index}>
                                                                {
                                                                    status === 'Accepted'
                                                                        ? (
                                                                            <div className='flex justify-center items-center hover:border hover:border-green-400 hover:rounded-md overflow-hidden'>
                                                                                {
                                                                                    acceptLoading ? <Loader2 className='animate-spin border ' /> :
                                                                                        <>
                                                                                            <div className='pl-1 mr-2'>
                                                                                                {status}
                                                                                            </div>
                                                                                            <Check className=' h-6 w-6 bg-green-400 hover:rounded-r-md' /></>
                                                                                }
                                                                            </div>
                                                                        )
                                                                        : (
                                                                            <div className="flex justify-center items-center hover:border hover:border-red-600 hover:rounded-md overflow-hidden">
                                                                                {
                                                                                    rejectLoading ? <Loader2 className='animate-spin border ' /> :
                                                                                        <>
                                                                                            <div className="pl-2 mr-2">
                                                                                                {status}
                                                                                            </div>
                                                                                            <X className="h-6 w-6 bg-red-600 hover:rounded-r-md" />
                                                                                        </>
                                                                                }
                                                                            </div>
                                                                        )
                                                                }
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