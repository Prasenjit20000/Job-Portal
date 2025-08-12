import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../components/utils/constants'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleJob } from '../redux/jobSlice'

const getJobById = (jobId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleJob = async()=>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials : true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }
        fetchSingleJob();
    },[jobId,dispatch]);
}

export default getJobById 