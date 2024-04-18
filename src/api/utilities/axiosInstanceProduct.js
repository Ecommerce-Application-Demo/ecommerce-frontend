import axios from "axios";
import { product_hostname } from "./utilites";

const axiosInstanceProduct = axios.create({
    baseURL: product_hostname,
  });
  
export default axiosInstanceProduct;