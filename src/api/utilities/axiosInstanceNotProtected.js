import axios from "axios";
import { hostname } from "./utilites";
import { toast } from "react-toastify";

const axiosInstanceNotProtected = axios.create({
    baseURL: hostname,
  });

axiosInstanceNotProtected.interceptors.response.use(
    (response)=> {
        return response;
    },
    (error)=>{
        console.log(error);
       toast.error(error?.response?.data?.errorMessage || 'something went wrong');
    }
)

export default axiosInstanceNotProtected;