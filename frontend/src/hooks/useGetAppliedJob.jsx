import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { APPLICATION_API_END_POINT } from '../components/utils/constants';
import { toast } from 'sonner';
import { setAllAppliedJobs } from '../redux/jobSlice';

const useGetAppliedJob = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetchAppliedJobs();
    }, []);
}

export default useGetAppliedJob