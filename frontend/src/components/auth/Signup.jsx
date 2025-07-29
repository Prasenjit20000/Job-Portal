import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup } from "@/components/ui/radio-group"
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constants'
import { toast } from "sonner"



const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  })

  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    // what is change in the input fields(except file input) that 
    // changes store in the input state variable
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fullname',input.fullname);
      formData.append('email',input.email);
      formData.append('phoneNumber',input.phoneNumber);
      formData.append('password',input.password);
      formData.append('role',input.role);

      // because input field not required in the user model
      if(input.file){
        formData.append('file',input.file);
      }
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type" : "multipart/form-data"
        },
        withCredentials:true,
      });
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)  
    }
    
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className=' w-1/2 border border-gray-200 p-4 rounded-md my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign up</h1>

          <div className='my-3'>
            <Label className='my-1.5'>Full Name</Label>
            <Input
              type="text"
              value = {input.fullname}
              name = "fullname"
              onChange={changeEventHandler}
              placeholder="Enter your name"
            />
          </div>

          <div className='my-3'>
            <Label className='my-1.5'>Email</Label>
            <Input
              type="email"
              value = {input.email}
              name = "email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
          </div>

          <div className='my-3'>
            <Label className='my-1.5'>Phone Number</Label>
            <Input
              type="text"
              value = {input.phoneNumber}
              name = "phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone no."
            />
          </div>

          <div className='my-3'>
            <Label className='my-1.5'>Password</Label>
            <Input
              type="password"
              value = {input.password}
              name = "password"
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
                  checked={input.role==='student'}
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
                  checked={input.role==='recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className='flex justify-center'>
            <Button type='submit' className='w-full mt-4 mb-1'>Signup</Button>
          </div>
          <div className='flex justify-center text-sm'>
            <p><span className='text-gray-600'>Already have an account?</span><Link to='/login' className='text-blue-600'>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup