import axios from "axios";
import { hostname } from "../utilities/utilites";
import axiosInstanceProtected from "../utilities/axiosInstanceProtected";
import axiosInstanceNotProtected from "../utilities/axiosInstanceNotProtected";

//email check
const generateOtp = async(email)=>{
    const response = await axiosInstanceNotProtected.post(`/api/auth/generate`,email);
    return response.data;
};

//email check
const validateOtp = async(email)=>{
    const response = await axiosInstanceNotProtected.post(`/api/auth/validate`,email);
    return response.data;
};

//authenticate generate otp
const authenticateGenerateOtp = async(email)=>{
    const response = await axiosInstanceProtected.post(`/api/my/generate`,email);
    return response.data;
};

//authenticate validate otp
const authenticateValidateOtp = async(email)=>{
    const response = await axiosInstanceProtected.post(`/api/auth/validate`,email);
    return response.data;
};

const otpService = {
    generateOtp,
    validateOtp,
    authenticateGenerateOtp,
    authenticateValidateOtp,
}

export default otpService;