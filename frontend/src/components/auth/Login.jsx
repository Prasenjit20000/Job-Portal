import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from "react-router-dom"
import { USER_API_END_POINT } from '../utils/constants'
import axios from "axios"
import { toast } from "sonner"


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  })
  const changeEventHandler = (e) => {
    // what is change in the input fields(except file input) that 
    // changes store in the input state variable
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input)
    const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials : true,
    });
    if (res.data.success) {
      navigate("/")
      toast.success(res.data.message)
    }
  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className=' w-1/2 border border-gray-200 p-4 rounded-md my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign up</h1>

          <div className='my-3'>
            <Label className='my-1.5'>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
          </div>

          <div className='my-3'>
            <Label className='my-1.5'>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
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
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
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
export default Login