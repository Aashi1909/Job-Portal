import axios from "axios";
import { useEffect } from "react";
import { APPLICATION_API_URL } from "../utils/constant";
import { setAllAppliedJobs } from "../redux/jobSlice";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAppledJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_URL}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppledJobs();
    },[])

}
export default useGetAppliedJobs