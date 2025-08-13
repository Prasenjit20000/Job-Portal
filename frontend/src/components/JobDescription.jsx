import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from './utils/constants';
import { toast } from 'sonner';
import { setSingleJob } from '../redux/jobSlice';
import Navbar from './shared/Navbar'
import Footer from './Footer';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true); //update local state which help to change the appearence of apply button
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));  //update the single job also
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(isApplied);
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user]);
    return (
        <div>
            <Navbar />
            <div className="md:max-w-7xl md:mx-45 mx-4 my-3">
                {/* Top section */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    {/* Left: Title + badges */}
                    <div>
                        <h1 className="font-bold md:text-lg text-sm">{singleJob?.title}</h1>
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <Badge variant="ghost" className="text-blue-700 font-bold">
                                {singleJob?.position} Positions
                            </Badge>
                            <Badge variant="ghost" className="text-[#F83002] font-bold">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge variant="ghost" className="text-[#7209b7] font-bold">
                                {singleJob?.salary} LPA
                            </Badge>
                        </div>
                    </div>

                    {/* Right: Apply button */}
                    <div>
                        {isApplied ? (
                            <Button
                                className="h-10 w-16 md:w-full md:h-8 bg-green-400 cursor-not-allowed whitespace-normal break-words"
                            >
                                <p className="md:text-sm text-xs">
                                    Already <br className="md:hidden" /> Applied
                                </p>
                            </Button>
                        ) : (
                            <Button
                                onClick={applyJobHandler}
                                className="bg-[#7209b7] hover:bg-[#4d077c] h-10 md:h-8 hover:cursor-pointer whitespace-normal break-words"
                            >
                                <p className="md:text-sm text-xs">
                                    Apply <br className="md:hidden" /> Now
                                </p>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-b-2 border-b-gray-300 font-medium py-4">
                    Job Description
                </div>

                {/* Job details */}
                <div className="py-4 md:text-sm text-xs space-y-2">
                    <h1 className="font-bold">
                        Company Name:
                        <span className="pl-4 font-normal text-gray-800">
                            {singleJob?.company?.name}
                        </span>
                    </h1>
                    <h1 className="font-bold">
                        Role:
                        <span className="pl-4 font-normal text-gray-800">
                            {singleJob?.title}
                        </span>
                    </h1>
                    <h1 className="font-bold">
                        Location:
                        <span className="pl-4 font-normal text-gray-800">
                            {singleJob?.location}
                        </span>
                    </h1>
                    <h1 className="font-bold">
                        Description:
                        <span className="pl-4 font-normal text-gray-800">
                            {singleJob?.description}
                        </span>
                    </h1>
                    <h1 className="font-bold">
                        Experience:
                        <span className="pl-4 font-normal text-gray-800">
                            {singleJob?.experienceLevel} yrs
                        </span>
                    </h1>
                    <h1 className="font-bold">
                        Salary:
                        <span className="pl-4 font-normal text-gray-800">
                            {singleJob?.salary} LPA
                        </span>
                    </h1>
                    <h1 className="font-bold">
                        Total Applicants:
                        <span className="pl-4 font-normal text-gray-800">
                            {singleJob?.applications?.length}
                        </span>
                    </h1>
                    <h1 className="font-bold">
                        Posted Date:
                        <span className="pl-4 font-normal text-gray-800">
                            {singleJob?.createdAt?.split("T")[0]}
                        </span>
                    </h1>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobDescription