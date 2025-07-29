import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Link} from "react-router-dom"



const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form action="" className=' w-1/2 border border-gray-200 p-4 rounded-md my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign up</h1>

          <div className='my-3'>
            <Label className='my-1.5'>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className='my-3'>
            <Label className='my-1.5'>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className=' flex justify-between items-center'>
            <RadioGroup className='flex'>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className='flex justify-center'>
            <Button type='submit' className='w-full mt-4 mb-1'>Login</Button>
          </div>
          <div className='flex justify-center text-sm'>
            <p><span className='text-gray-600'>Don't have an account?</span><Link to='/signup' className='text-blue-600'>Signup</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup