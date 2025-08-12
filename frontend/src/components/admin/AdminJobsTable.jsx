import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from '../ui/avatar'

const AdminJobsTable = () => {
    const navigate = useNavigate();
    const { searchJobByText } = useSelector(store => store.job);
    const { allAdminJobs } = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    useEffect(() => {
        const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        })
        setFilterJob(filteredJob);
    }, [allAdminJobs,searchJobByText]);
    return (
        <div className=''>
            <Table>
                <TableCaption>{
                    allAdminJobs?.length <= 0 ? <>You haven't posted any job yet.</> :
                        <> A list of your recent posted jobs.</>
                }
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-center'>Logo</TableHead>
                        <TableHead className='text-center'>Company Name</TableHead>
                        <TableHead className='text-center'>Role</TableHead>
                        <TableHead className='text-center'>Job Type</TableHead>
                        <TableHead className='text-center'>Date</TableHead>
                        <TableHead className='text-center'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJob?.map((job) => (
                            <tr key={job._id}>
                                <TableCell className='flex items-center justify-center'>
                                        <Avatar>
                                            <AvatarImage src={`${job?.company?.logo}`}></AvatarImage>
                                        </Avatar>
                                    </TableCell>
                                <TableCell className='text-center'>{job.company?.name}</TableCell>
                                <TableCell className='text-center'>{job.title}</TableCell>
                                <TableCell className='text-center'>{job.jobType}</TableCell>
                                <TableCell className='text-center'>{job.createdAt.split('T')[0]}</TableCell>
                                <TableCell className='text-center'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className='cursor-pointer' />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-36'>
                                            <div onClick={() => navigate(`/admin/job/update/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer justify-center '>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/job/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer justify-center mt-2'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable