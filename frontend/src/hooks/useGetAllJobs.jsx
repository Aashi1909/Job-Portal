import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import axios from "axios";
import { JOB_API_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import {setAllJobs} from '@/redux/jobSlice'


const userGetAllJobs =() =>{
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllJobs = async() =>{
            try{
                const res = await axios.get(`${JOB_API_URL}/get`, {
                    withCredentials: true
                })
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))

                }

            }catch(error)
            {
                console.log(error)
            }
        }
        fetchAllJobs();
    }, [])
}

export default userGetAllJobs