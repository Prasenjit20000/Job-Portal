import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'

const CompaniesTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent registerd companies.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableCell>
                        <Avatar>
                            <AvatarImage src='https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'></AvatarImage>
                        </Avatar>
                    </TableCell>
                    <TableCell>
                        Company Name
                    </TableCell>
                    <TableCell>
                        04-08-2025
                    </TableCell>
                    <TableCell>
                        <Popover>
                            <PopoverTrigger>
                                <MoreHorizontal className='cursor-pointer' />
                            </PopoverTrigger>
                            <PopoverContent className='w-24'>
                                <div className='flex items-center gap-2 w-fit cursor-pointer justify-center '>
                                    <Edit2  className='w-4'/>
                                    <span>Edit</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable