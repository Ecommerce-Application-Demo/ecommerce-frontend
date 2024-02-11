import axios from "axios"
import { hostname } from "../utilities/utilites"


const viewProfile = async (token) => {
    const response = await axios.get(`${hostname}/api/my/account`,
    {
        headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );
    return  response.data;
}

const validatePassword = async (currentPasword,token) => {
  const response = await axios.post(`${hostname}/api/my/relogin`,
  currentPasword,
  {
      headers: {
      Authorization: `Bearer ${token}`
    }
  }
  );
  return  response.data;
}

const profileService = {
   viewProfile,
   validatePassword,
}

export default profileService;