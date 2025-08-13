import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constants'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '../../redux/applicationSlice'
import Footer from '../Footer'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const jobId = params.id;
    const {applicants} = useSelector(store => store.application);
    const {reload} = useSelector(store=>store.application)
    useEffect(()=>{
        const fetchAllApplicants = async() =>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`,{withCredentials : true});
                if(res.data.success){
                    dispatch(setApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    },[jobId,reload])
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-3 md:mx-20 '>
            <h1 className='font-bold text-lg my-5'>Applicants({`${applicants?.applications?.length}`})</h1>
            <ApplicantsTable/>
        </div>
        <Footer/>
    </div>
  )
}

export default Applicants