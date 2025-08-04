import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'

const CompaniesTable = () => {
    const { allCompanies } = useSelector(store => store.company);
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
                    {
                        allCompanies.length <= 0 ? <span>You haven't registered any company yet.</span> :
                            allCompanies?.map((company) => (
                                <tr>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={`${company.logo}`}></AvatarImage>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        {company.name}
                                    </TableCell>
                                    <TableCell>
                                        {company.createdAt.split('T')[0]}
                                    </TableCell>
                                    <TableCell>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className='cursor-pointer' />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-24'>
                                                <div className='flex items-center gap-2 w-fit cursor-pointer justify-center '>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
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

export default CompaniesTable