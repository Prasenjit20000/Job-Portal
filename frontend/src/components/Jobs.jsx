import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {  setSearchedQuery } from '../redux/jobSlice';


const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();
    console.log(searchedQuery )
    useEffect(() => {
        if (searchedQuery) {
            console.log('iff')
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.jobType.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job?.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs);
        } else {
            console.log('else')
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);
    // when exit from this page it will set the search query with empty string
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, []);
    return (
        <div>
            <Navbar />
            {/* filter page */}
            <div className='max-w-7xl mx-4 md:mx-20 mt-5'>
                <div className=' flex gap-5'>
                    <div className='md:w-[20%] w-[38%] '>
                        <FilterCard />
                    </div>
                    {/* jobs according to this filter */}
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> :
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5 relative group custom-scroll'>
                                <div className='grid md:grid-cols-3 grid-cols-1  gap-4'>
                                    {
                                        filterJobs.map((job) =>
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}>
                                                <Job key={job._id} job={job} />
                                            </motion.div>

                                        )
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs