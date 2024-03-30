import axios from "axios";
import { hostname } from "../utilities/utilites";

//email check
const generateOtp = async(email)=>{
    const response = await axios.post(`${hostname}/api/auth/generate`,email);
    return response.data;
};

//email check
const validateOtp = async(email)=>{
    const response = await axios.post(`${hostname}/api/auth/validate`,email);
    return response.data;
};

const otpService = {
    generateOtp,
    validateOtp,
}

export default otpService;