import axios from 'axios'
import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '../components/utils/constants'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'

const getCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany = async()=>{
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials : true});
                if(res.data.success){
                    // toast.success(res.data.message);
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }
        fetchSingleCompany();
    },[companyId,dispatch]);
}

export default getCompanyById 