import React, { useEffect, useState } from "react";
import {Label} from '../ui/label'
import {Input} from '../ui/input'
import Navbar from "../shared/Navbar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Button} from '../ui/button'
import { Link, useNavigate } from "react-router-dom";
import { USER_API_URL } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";


const Signup =() =>{
    const {user} = useSelector(store=>store.auth)
    const [input, setInput] = useState({
            fullname:"",
            email:"",
            phoneNumber:"",
            password:"",
            role:"",
            file:""
        });

        const navigate = useNavigate();
        const changeEventHandler = (e) => {
            setInput({...input, [e.target.name]: e.target.value});
        }
        const changeFileHandler = (e) => {
            setInput({...input, file: e.target.files?.[0]});
        }

        const submitHandler= async(e) =>{
            e.preventDefault();
            const formData= new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("password", input.password);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("role", input.role);
            if(input.file) {
                formData.append("file", input.file);
            }
            try{
                const res = await axios.post(`${USER_API_URL}/register`, formData,{
                    headers: { 'Content-Type': "multipart/form-data" },
                    
                    withCredentials: true
                });
                if(res.data.success){
                    navigate("/login");
                    toast.success(res.data.message);
                }
                else{
                    toast.error(res.data.message);
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
                    <h1 className="font-bold text-xl  mb-5">Sign Up</h1>
                    <div className="my-2">
                        <Label className="mt-3 text-[16px]" >Full Name</Label>
                        <Input type="text" placeholder="Enter Your Name" value={input.fullname} name="fullname" onChange={changeEventHandler} className="mt-3" />
                    </div>
                    <div className="my-2">
                        <Label className="mt-3 text-[16px]" >Email</Label>
                        <Input type="email" placeholder="Enter Your Email" value={input.email} name="email" onChange={changeEventHandler} className="mt-3"  />
                    </div>
                    <div className="my-2">
                        <Label className="mt-3 text-[16px]" >Password</Label>
                        <Input type="password" placeholder="Enter Your Password" value={input.password} name="password" onChange={changeEventHandler} className="mt-3"  />
                    </div>
                    <div className="my-2">
                        <Label className="mt-3 text-[16px]" >Phone Number</Label>
                        <Input type="number  " placeholder="Enter Your Password" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} className="mt-3"  />
                    </div>
                    <div className="flex items-center justify-between">
                    <RadioGroup className="flex items-center gap-4 my-5">
                    <div className="flex items-center space-x-2">
                        <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} className="cursor-pointer"/>
                        <Label htmlFor="student" className="text-[16px]">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler}  className="cursor-pointer"/>
                    <Label htmlFor="recruiter" className="text-[16px]">Recruiter</Label>
                    </div>
                    </RadioGroup>
                    <div className="flex items-center gap-2">
                        <Label className="text-[16px]">Profile</Label>
                        <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
                    </div>
                    </div>
                    <div className="flex justify-center items-center">
                    <Button type="submit" className="w-1/4 text-[16px] my-4">
                        SignUp
                    </Button>
                    </div>
                    <span>Already have an Account ? <Link to="/login" className="text-red-500 font-semibold" >Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup