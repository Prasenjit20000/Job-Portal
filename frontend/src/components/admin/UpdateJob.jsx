import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import getJobById from '../../hooks/getJobById'
import { setLoading } from '../../redux/authSlice'
import { JOB_API_END_POINT } from '../utils/constants'
import Footer from '../Footer'

const UpdateJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;
  getJobById(jobId);
  // const [loading, setLoading] = useState(false);
  const { loading } = useSelector(store => store.auth);
  const { singleJob } = useSelector(store => store.job);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: ""
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    setInput({
      title: singleJob.title || "",
      description: singleJob.description || "",
      requirements: singleJob.requirements || "",
      salary: singleJob.salary || "",
      location: singleJob.location || "",
      jobType: singleJob.jobType || "",
      experienceLevel: singleJob.experienceLevel || "",
      position: singleJob.position || ""
    })
  }, [singleJob, dispatch]);
  return (
    <div>
      <Navbar />
      <div className='max-w-xl md:mx-auto mx-5 mb-10 mt-5'>
        <form >
          <div className='flex items-center'>
            <Button onClick={() => navigate('/admin/jobs')} variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold cursor-pointer'>
              <ArrowLeft />
              <span>Back</span>
            </Button>
          </div>
          <div className='flex justify-center items-center mb-5'>
            <h1 className='font-bold text-2xl '>Update Job</h1>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label className='mb-1.5'>Title</Label>
              <Input
                type='text'
                name='title'
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='mb-1.5'>Description</Label>
              <Input
                type='text'
                name='description'
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='mb-1.5'>Requirements</Label>
              <Input
                type='text'
                name='requirements'
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='mb-1.5'>Salary</Label>
              <Input
                type='text'
                name='salary'
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='mb-1.5'>Location</Label>
              <Input
                type='text'
                name='location'
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='mb-1.5'>Job Type</Label>
              <Input
                type='text'
                name='jobType'
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div >
              <Label className='mb-1.5'>Experience Level</Label>
              <Input
                type='text'
                name='experienceLevel'
                value={input.experienceLevel}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='mb-1.5'>No. of Position</Label>
              <Input
                type='number'
                name='position'
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
          </div>
          {
            loading ? <Button type='submit' className='w-full mt-8' ><Loader2 className='animate-spin' /></Button>
              : <Button onClick={submitHandler} className='w-full mt-8 cursor-pointer' >Update</Button>
          }
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default UpdateJob