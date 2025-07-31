import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './Footer'
import Job from './Job'

const randomJobs = [1, 2, 3,4,5,6,6,7]

const Browse = () => {
    return (
        <div>
            <Navbar />
            <div className='mx-20'>
                <h1 className='font-bold text-xl my-10'>Search Results ({randomJobs.length}) </h1>
                <div className=' grid grid-cols-3 gap-4'>
                    {
                        randomJobs.map((item, index) => {
                            return (
                                <Job />
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