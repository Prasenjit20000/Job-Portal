import Navbar from './shared/Navbar'
import Footer from './Footer'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useEffect } from 'react'
import { setSearchedQuery } from '../redux/jobSlice'



const Browse = () => {
    useGetAllJobs();
    const dispatch = useDispatch();
    const {allJobs} = useSelector(store=>store.job);
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[]);
    return (
        <div>
            <Navbar />
            <div className='mx-20'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length}) </h1>
                <div className=' grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job job={job} key={job._id}/>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Browse