import axios from "axios";
import { hostname } from "../utilities/utilites";
import axiosInstanceProtected from "../utilities/axiosInstanceProtected";

//email check
const emailCheck=async(email)=>{
    const response = await axios.post(`${hostname}/api/auth/email`,email);
    return response.data;
}

//register
const register = async(data)=>{
    const response = await axios.post(`${hostname}/api/auth/register`,data);
    return response.data;
}

//login
const login = async(data)=>{
    const response = await axios.post(`${hostname}/api/auth/login`,data);
    return response.data;
}

//logout
const logout = async(data)=>{
    const response = await axiosInstanceProtected.post(`/api/my/logout`,data);
    return response.data;
}

const authService ={
    emailCheck,
    register,
    login,
    logout,
}
export default authService;