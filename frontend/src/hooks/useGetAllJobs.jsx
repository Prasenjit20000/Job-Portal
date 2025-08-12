import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../components/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store => store.job);
  useEffect(()=>{
    dispatch(setAllJobs([]));
    const fetchAllJobs = async()=>{
        try {
            let res;
            if(searchedQuery.trim()){
                 res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
            }
            else{
                 res = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
            }
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllJobs();
  },[searchedQuery])
}

export default useGetAllJobs