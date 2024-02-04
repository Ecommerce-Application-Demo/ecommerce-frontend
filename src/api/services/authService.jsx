import axios from "axios";
import { hostname } from "../utilities/utilites";

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
const logout = async(data,token)=>{
    const response = await axios.post(`${hostname}/api/my/logout`,data,
    {
        headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
}

const authService ={
    emailCheck,
    register,
    login,
    logout,
}
export default authService;