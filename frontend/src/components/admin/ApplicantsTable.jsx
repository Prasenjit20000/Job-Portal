import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, Store } from 'lucide-react';
import { useSelector } from 'react-redux';

const shortlistingStatus = ['Accepted', "Rejected"];
const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
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
                                    <TableCell className='text-blue-600'><a href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferrer'>{item?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                                    <TableCell>{item?.createdAt.split('T')[0]}</TableCell>
                                    <TableCell className='text-right'>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-32'>
                                                {
                                                    shortlistingStatus.map((status, index) => {
                                                        return (
                                                            <div key={index}>
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