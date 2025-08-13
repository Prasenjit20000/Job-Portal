import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '../redux/jobSlice'



const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allJobs } = useSelector(store => store.job);
    const jobCategory = new Set();
    allJobs.forEach(job => jobCategory.add(job?.title));
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }
    return (
        <div>
            <Carousel className='w-1/2 max-w-xl mx-auto my-10'>
                <CarouselContent >
                    {
                        [...jobCategory].map(cat => (
                            <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                                <Button onClick={() => searchJobHandler(cat)} variant='outline' className='rounded-full border-purple-700 w-40 cursor-pointer'>
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel