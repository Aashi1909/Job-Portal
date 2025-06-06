import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {Input} from './ui/input';
import axios from "axios";
import { setUser } from '@/redux/authSlice'
import { USER_API_URL } from '@/utils/constant';
import { toast } from "sonner";



const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)  

    const {user} = useSelector(store =>store.auth)

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills.map(skill =>skill),
        file: user?.profile?.resume,
    })
    const dispatch = useDispatch();

    const changeEventHandler =(e) =>{
        setInput({...input,[e.target.name] : e.target.value})
    } 

    const fileChangeHandler =(e) =>{
        const file = e.target.files?.[0]; 
        setInput({...input, file})

    }

    const submitHandler = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if(input.file){
            formData.append("file", input.file)
        }

        try{
            setLoading(true);
            const res = await axios.post(`${USER_API_URL}/profile/update`, formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data'
                },
                withCredentials : true
            })
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        }catch(error)
        {
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" name="name" value={input.fullname} className="col-span-3" onChange={changeEventHandler}  />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email" value={input.email} className="col-span-3" onChange={changeEventHandler} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="number">Number</Label>
                                <Input id="number" type="number" name="phoneNumber" value={input.phoneNumber} className="col-span-3" onChange={changeEventHandler} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio">Bio</Label>
                                <Input id="bio" type="text" name="bio" value={input.bio} className="col-span-3" onChange={changeEventHandler} />
                            </div> 
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills">Skills</Label>
                                <Input id="skills" type="text" name="skills" value={input.skills} className="col-span-3" onChange={changeEventHandler} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file">Resume</Label>
                                <Input id="file" type="file" name="file" accept="application/pdf" className="col-span-3" onChange={fileChangeHandler } />
                            </div>

                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate spin" />Please Wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>

                            }

                        </DialogFooter>

                    </form>
                </DialogContent>

            </Dialog>

        </div>
    )
}

export default UpdateProfileDialog