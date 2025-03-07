import React, { useState } from "react";
import {Label} from '../ui/label'
import {Input} from '../ui/input'
import Navbar from "../shared/Navbar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Button} from '../ui/button'
import { Link } from "react-router-dom";


const Login =() =>{
    const [input, setInput] = useState({
        email:"",
        password:"",
        role:"",
    });
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }
    const submitHandler= async(e) =>{
        e.preventDefault();
        console.log(input);
    }
    return (
        <div>
            <Navbar/>
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10 ">
                    <h1 className="font-bold text-xl mb-5">Login</h1>
                    
                    <div className="my-2">
                        <Label className="mt-3 text-[16px]" >Email</Label>
                        <Input type="email" placeholder="Enter Your Email" value={input.email} name="email" className="mt-3"  />
                    </div>
                    <div className="my-2">
                        <Label className="mt-3 text-[16px]" >Password</Label>
                        <Input type="password" placeholder="Enter Your Password" value={input.password} name="password" className="mt-3"  />
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