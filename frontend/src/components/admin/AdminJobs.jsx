import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '../../redux/jobSlice'
import Footer from '../Footer'

const AdminJobs = () => {
  const navigate = useNavigate();
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto mb-10' >
        <div className='flex justify-between items-center mb-10 m-5 gap-4'>
          <Input
            className='md:w-[80%] w-70'
            placeholder='Filter by name'
            onChange={(e) => setInput(e.target.value)} />
          <Button className='md:w-[15%] w-24 md:text-base text-xs cursor-pointer' onClick={() => navigate('/admin/job/create')}>
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
      <Footer />
    </div>
  )
}

export default AdminJobs