import React, { useEffect, useState } from "react";
 import {Input} from '../ui/input'
import Navbar from "../shared/Navbar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Button} from '../ui/button'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_URL } from "../../utils/constant";
import { setUser } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import {Label} from '../ui/label'

const Login =() =>{
    const [input, setInput] = useState({
        email:"",
        password:"",
        role:"",
    });
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.auth)
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }
    const submitHandler= async(e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(`${USER_API_URL}/login`, input,{
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);    
            }
          
        }catch(error){
            if (error.response) {
                toast.error(error.response.data.message || "Something went wrong!");
            } else if (error.request) {
                toast.error("No response from server. Please try again.");
            } else {
                toast.error("An unexpected error occurred.");
            }
            console.log(error);
            
        }
    }
    useEffect(() => {
        if(user){
            navigate("/")
        }
        
    })
    return (
        <div>
            <Navbar/>
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10 ">
                    <h1 className="font-bold text-xl mb-5">Login</h1>
                    
                    <div className="my-2">
                        <Label className="mt-3 text-[16px]" >Email</Label>
                        <Input type="email" placeholder="Enter Your Email" value={input.email} name="email" className="mt-3" onChange={changeEventHandler}  />
                    </div>
                    <div className="my-2">
                        <Label className="mt-3 text-[16px]" >Password</Label>
                        <Input type="password" placeholder="Enter Your Password" value={input.password} name="password" className="mt-3" onChange={changeEventHandler}  />
                    </div>
                    <div className="flex items-center justify-between">
                    <RadioGroup className="flex items-center gap-4 my-5">
                    <div className="flex items-center space-x-2">
                        <Input type="radio" name="role" value="student" className="cursor-pointer" checked={input.role === "student"} onChange={changeEventHandler}/>
                        <Label htmlFor="student" className="text-[16px]">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked={input.role === "recruiter"} onChange={changeEventHandler}/>
                    <Label htmlFor="recruiter" className="text-[16px]">Recruiter</Label>
                    </div>
                    </RadioGroup>
                    
                    </div>
                    <div className="flex justify-center items-center">
                    <Button type="submit" className="w-1/4 text-[16px] my-4">
                        Login
                    </Button>
                    </div>
                    <span>Don't have an Account ? <Link to="/signup" className="text-red-500 font-semibold" >SignUp</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login