import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'
import Footer from '../Footer'

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input,setInput] = useState('');
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto mb-10' >
                <div className='flex justify-between items-center mb-10 m-5 gap-4'>
                    <Input
                        className='md:w-[80%] w-70'
                        placeholder='Filter by name'
                        onChange={(e)=>setInput(e.target.value)} />
                    <Button className='md:w-[15%] w-24 md:text-base text-xs' onClick={()=>navigate('/admin/companies/create')}>
                        New Company
                    </Button>
                </div>
                <CompaniesTable/>
            </div>
            <Footer/>
        </div>
    )
}

export default Companies