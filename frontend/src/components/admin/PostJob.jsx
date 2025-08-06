import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constants'
import { toast } from 'sonner'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const PostJob = () => {
    const navigate = useNavigate();
    const { allCompanies } = useSelector(store => store.company);
    const {loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    // console.log(allCompanies);
    // const [isLoading,setIsLoading] = useState(false);
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: ''
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const selectChangeHandler = (value) => {
        const selectedCompany = allCompanies.find((company) => company.name === value);
        setInput({ ...input, companyId: selectedCompany?._id });
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
                headers : {
                    'Content-Type' : 'application/json'
                },
                withCredentials : true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(setLoading(false));
        }
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-4 border border-gray-200 shadow-lg rounded-md gap-4'>
                    <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type='text'
                                name='title'
                                value={input.title}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type='text'
                                name='requirements'
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type='text'
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type='text'
                                name='jobType'
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type='text'
                                name='experience'
                                value={input.experience}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>
                        <div>
                            <Label>No. of Position</Label>
                            <Input
                                type='number'
                                name='position'
                                value={input.position}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>
                        {
                            <Select disabled={allCompanies.length === 0} onValueChange={selectChangeHandler}>
                                <SelectTrigger className='w-[100%]'>
                                    <SelectValue placeholder='Select a Company' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            allCompanies.map((company) => {
                                                return (
                                                    <SelectItem value={company.name}>{company?.name}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        }
                    </div>
                    {
                        loading ? <Button className='w-full mt-4' ><Loader2 className='animate-spin'/></Button>: <Button className='w-full mt-4'>Post New Job</Button>
                    }

                    {
                        allCompanies.length === 0 && <p className='text-xs text-red-600 text-center my-3 font-bold '> *Please register a company first, before posting a job.</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob