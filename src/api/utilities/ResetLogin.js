import axios from 'axios';
import { hostname } from './utilites';
import {jwtDecode} from 'jwt-decode';
// import { updateJwt } from '../../redux/Slices/userSlice';

const ValidateJWT = async (jwtToken, dispatch) => {
    const decoded = jwtDecode(jwtToken);
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    const expireDate = new Date(decoded.exp * 1000);
    const currentDate = new Date();
  
    if (currentDate >= expireDate) {
      try {
        const response = await axios.post(`${hostname}/api/auth/jwt-token`, {
          input: refreshToken
        });
        const newToken = response?.data;
        // dispatch(updateJwt(response?.data));
        return newToken;
      } catch (error) {
        // Handle token refresh failure, e.g., log the error or logout the user
        console.error("Token refresh failed:", error);
        // You might consider logging the user out or displaying an error message
        throw error; // Rethrow the error to propagate it further
      }
    } else {
      return jwtToken;
    }
  };
  

export default ValidateJWT;
