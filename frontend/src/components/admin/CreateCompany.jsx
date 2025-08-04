import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constants'
const CreateCompany = () => {
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState('');
    const registerNewCompany = async () => {
        try {
            const res = axios.post(`${COMPANY_API_END_POINT}/resgister`,{companyName},{
                headers : {
                    'Content-Type' : 'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Comapany Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type='text'
                    className='my-2'
                    placeholder='Mirosoft.'
                    onChange={(e)=>setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button onClick={() => navigate('/admin/companies')}>Cancel</Button>
                    <Button className='' variant='outline'>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany