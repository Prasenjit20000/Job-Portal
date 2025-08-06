import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constants'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '../../redux/applicationSlice'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    
    const {applicants} = useSelector(store => store.application);
    console.log(applicants);
    useEffect(()=>{
        const fetchAllApplicants = async() =>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials : true});
                if(res.data.success){
                    dispatch(setApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-20'>
            <h1 className='font-bold text-lg my-5'>Applicants({`${applicants?.applications?.length}`})</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants