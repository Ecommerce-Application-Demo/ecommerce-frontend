import axios from "axios";
import { product_hostname } from "./utilites";
import { toast } from "react-toastify";

const axiosInstanceProduct = axios.create({
    baseURL: product_hostname,
    headers :{
     'x-functions-key': 1213
    }
  });

axiosInstanceProduct.interceptors.response.use(
  (response)=> {
      return response;
  },
  (error)=>{
      console.log(error);
     toast.error(error?.response?.data?.errorMessage || 'something went wrong');
  }
)  
export default axiosInstanceProduct;