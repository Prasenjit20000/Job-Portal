import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchCompanyByText } from '../../redux/companySlice'

const AdminJobsTable = () => {
    const navigate = useNavigate();
    const {searchCompanyByText} = useSelector(store=>store.company);
    const { searchJobByText } = useSelector(store => store.job);
    const { allAdminJobs } = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(allAdminJobs);
    useEffect(() => {
        const filteredJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
            job?.company?.name.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilterJob(filteredJob);
    }, [allAdminJobs, searchJobByText]);
    return (
        <div className='bg-amber-600'>
            <Table>
                <TableCaption>{
                    allAdminJobs?.length <= 0 ? <>You haven't posted any job yet.</> :
                        <> A list of your recent posted jobs.</>
                }
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead >Company Name</TableHead>
                        <TableHead >Role</TableHead>
                        <TableHead >Date</TableHead>
                        <TableHead >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJob?.map((job) => (
                            <tr key={job._id}>
                                <TableCell>{job.company?.name}</TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.createdAt.split('T')[0]}</TableCell>
                                <TableCell >
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className='cursor-pointer' />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-24'>
                                            {/* <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer justify-center '> */}
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                            {/* </div> */}
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