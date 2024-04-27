import axios from "axios"
import { hostname } from "../utilities/utilites"
import axiosInstanceProtected from "../utilities/axiosInstanceProtected";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";


// const token = localStorage.getItem('JWT');

const viewProfile = async () => {
  console.log('profileService');
  const response = await axiosInstanceProtected.get(`/api/my/account`);
  return response.data;
};

const editProfile = async (formData) => {
  console.log('profileService');
  const response = await axiosInstanceProtected.put(`/api/my/account`,
  formData,
  );
  return response.data;
};



const validatePassword = async (currentPasword) => {
  const response = await axiosInstanceProtected.post(`/api/my/relogin`,
  currentPasword,
  );
  return  response.data;
}

const changePassword = async (newPassword) => {
  const response = await axios.post(`/api/my/password`,
  newPassword,
  );
  return  response.data;
}

const profileService = {
   viewProfile,
   editProfile,
   validatePassword,
   changePassword,
}

export default profileService;