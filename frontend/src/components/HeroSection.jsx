import { Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import {useDispatch} from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query,setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(query);
    const searchJobHandler = () =>{
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-18'>
                <span className='px-4 py-2 rounded-full text-[#F83002] bg-gray-100 font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold pt-4'>
                    Search, Apply & <br />
                    Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel repudiandae non aliquid voluptates blanditiis ducimus!</p>
                <div className='flex justify-center'>

                    <div className=' w-[80%] flex justify-center'>
                        <div className=' w-[40%] flex items-center shadow-lg border border-gray-300 pl-7 rounded-l-full '>
                            <input
                                type="text"
                                placeholder='Find your dream jobs'
                                onChange={(e)=>setQuery(e.target.value)}
                                className='outline-none border-none h-5 w-full'
                            />
                        </div>
                        <Button className='rounded-r-full w-12 bg-[#6A38C2]' onClick={searchJobHandler}>
                            <Search />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection