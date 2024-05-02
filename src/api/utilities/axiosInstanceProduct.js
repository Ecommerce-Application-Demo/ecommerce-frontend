import axios from "axios";
import { product_hostname } from "./utilites";

const axiosInstanceProduct = axios.create({
    baseURL: product_hostname,
    headers :{
     'x-functions-key': 1213
    }
  });
  
export default axiosInstanceProduct;