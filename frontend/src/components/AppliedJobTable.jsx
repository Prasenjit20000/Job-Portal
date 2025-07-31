import React from 'react'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from './ui/table'
import { Badge } from './ui/badge'
const AppliedJobTable = () => {
  return (
    <div>
        <Table>
            <TableCaption>List of your applied jobs</TableCaption>
            <TableHeader>
                <TableHead className='text-center'>Date</TableHead>
                <TableHead className='text-center'>Job Role</TableHead>
                <TableHead className='text-center'>Company</TableHead>
                <TableHead className='text-center'>Status</TableHead>
            </TableHeader>
            <TableBody>
                {
                    [1,2,3,4].map((item,index)=>(
                        <TableRow key={index}>
                            <TableCell className='text-center'>31-07-2025</TableCell>
                            <TableCell className='text-center'>Frontend Developer</TableCell>
                            <TableCell className='text-center'>TCS</TableCell>
                            <TableCell className='text-center'><Badge>Rejected</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    </div>
  )
}

export default AppliedJobTable