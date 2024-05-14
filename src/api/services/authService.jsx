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
const logout = async()=>{
    const response = await axiosInstanceProtected.post(`/api/my/logout`,
    { input : localStorage.getItem("REFRESH_TOKEN") || ''
    }
    );
    return response.data;
}

//logout all device
const logoutAllDevice = async()=>{
    const response = await axiosInstanceProtected.get(`/api/my/logout/allDevice`
    );
    return response.data;
}

const authenticateCall = async () => {
    try {
      const response = await axiosInstanceProtected.get(`/api/auth/index`);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      throw error;
    }
  };

const authService ={
    authenticateCall,
    emailCheck,
    register,
    login,
    logout,
    logoutAllDevice,
}
export default authService;