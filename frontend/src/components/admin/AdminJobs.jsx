import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '../../redux/jobSlice'

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
      <div className='max-w-6xl mx-auto my-10' >
        <div className='flex justify-between items-center mb-10'>
          <Input
            className='w-fit'
            placeholder='Filter by name'
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate('/admin/job/create')}>
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs