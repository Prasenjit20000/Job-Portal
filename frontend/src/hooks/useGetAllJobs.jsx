import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../components/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'
import { toast } from 'sonner'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store => store.job);
  useEffect(()=>{
    dispatch(setAllJobs([]));
    const fetchAllJobs = async()=>{
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
            if(res.data.success){
                console.log('inside useGetAllJobs')
                console.log(res.data.jobs)
                dispatch(setAllJobs(res.data.jobs));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllJobs();
  },[])
}

export default useGetAllJobs