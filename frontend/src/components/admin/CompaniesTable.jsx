import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const navigate = useNavigate();
    const { allCompanies,searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany,setFilterCompany] = useState(allCompanies);
    useEffect(()=>{
        const filteredCompany = allCompanies.length>=0 && allCompanies.filter((company)=>{
            if(!searchCompanyByText){
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilterCompany(filteredCompany);
    },[allCompanies,searchCompanyByText]);
    return (
        <div>
            <Table>
                <TableCaption>{
                    allCompanies.length <= 0 ? <>You haven't registerd any company yet.</>:
                    <> A list of your recent registerd companies.</>
                    }
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-center'>Logo</TableHead>
                        <TableHead className='text-center'>Name</TableHead>
                        <TableHead className='text-center'>Date</TableHead>
                        <TableHead className='text-center'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allCompanies.length <= 0 ? <></>
                         :
                            filterCompany?.map((company) => (
                                <tr>
                                    <TableCell className='flex items-center justify-center'>
                                        <Avatar>
                                            <AvatarImage src={`${company.logo}`}></AvatarImage>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className='text-center'>
                                        {company.name}
                                    </TableCell>
                                    <TableCell className='text-center'>
                                        {company.createdAt.split('T')[0]}
                                    </TableCell>
                                    <TableCell className='text-center'>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className='cursor-pointer' />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-24'>
                                                <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer justify-center '>
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