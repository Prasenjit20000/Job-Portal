import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup } from "@/components/ui/radio-group"
import { Link, useNavigate } from "react-router-dom"
import { USER_API_END_POINT } from '../utils/constants'
import axios from "axios"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setUser } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'
import Footer from '../Footer'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading,user} = useSelector(store => store.auth);
  
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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // when click login button setLoading action will dispatch
      dispatch(setLoading(true)); //start here
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        // because when login done in backend controller it returns user also
        console.log(res.data.token)
        console.log(res.data.user)
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log("hello i am here");
      toast.error(error.response.data.message)
      console.log(error)
    }
    finally{
      console.log("hello i am here");
      // loading end here
      dispatch(setLoading(false));
    }
  }
  // when a logged in user try to visit the login page again this will redirect logged in users to home page
  // when login page visit this useeffect execute automatically only once
  useEffect(()=>{
    if(user){
      navigate('/');
    }
  },[]);
  return (
    <div>
      <Navbar />
      <div className='md:flex md:items-center md:justify-center md:max-w-7xl'>
        <form onSubmit={submitHandler} className=' md:w-1/2 border border-gray-200 p-4 rounded-md my-10'>
          <h1 className='font-bold text-xl md:text-2xl mb-5'>Login</h1>

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
          {
            loading ? 
            <Button className='w-full mt-4 mb-1'><Loader2 className='animate-spin'/>Please wait</Button> :
            (<div className='flex justify-center'>
            <Button type='submit' className='w-full mt-4 mb-1 cursor-pointer'>Login</Button>
          </div>)
          }
          <div className='flex justify-center text-sm'>
            <p><span className='text-gray-600'>Don't have an account?</span><Link to='/signup' className='text-blue-600'>Signup</Link></p>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  )
}
export default Login