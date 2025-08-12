import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constants'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import getCompanyById from '../../hooks/getCompanyById'

const CompanySetup = () => {
    const navigate = useNavigate();
    const params = useParams();
    const companyId = params.id;
    getCompanyById(companyId);
    const [loading, setLoading] = useState(false);
    const { singleCompany } = useSelector(store => store.company);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        if (input.file) {
            formData.append('file', input.file);
        }
        try {
            // formdata always send as raw formData. Don't use {formData} when send to backend
            // but normal variable can be send using {name}
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            });
            if (res.data.success) {
                console.log(res.data);
                navigate('/admin/companies');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);
    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-4 md:mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center'>
                        <Button onClick={() => navigate('/admin/companies')} variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                    </div>
                    <div className='flex justify-center items-center mb-5'>
                        <h1 className='font-bold text-2xl '>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label className='mb-1.5'>Company Name</Label>
                            <Input
                                type='text'
                                name='name'
                                value={input.name}
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
                            <Label className='mb-1.5'>Website</Label>
                            <Input
                                type='text'
                                name='website'
                                value={input.website}
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
                            <Label className='mb-1.5'>Logo</Label>
                            <Input
                                type='file'
                                accept='image/*'
                                className='md:w-70 w-55'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button type='submit' className='w-full mt-8' ><Loader2 className='animate-spin' /></Button>
                            : <Button type='submit' className='w-full mt-8' >Update</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup