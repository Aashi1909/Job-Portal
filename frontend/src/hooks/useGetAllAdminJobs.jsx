import { useEffect } from "react";
import axios from "axios";
import { JOB_API_URL } from '@/utils/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'


const useGetAllAdminJobs =() =>{
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async() =>{
            try{
                const res = await axios.get(`${JOB_API_URL}/getAdminJobs`, {
                    withCredentials: true
                })
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs))

                }

            }catch(error)
            {
                console.log(error)
            }
        }
        fetchAllAdminJobs();
    }, [])
}

export default useGetAllAdminJobs