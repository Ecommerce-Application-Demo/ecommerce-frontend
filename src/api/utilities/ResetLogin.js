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
        localStorage.setItem('JWT');
        // dispatch(updateJwt(response?.data));
        return newToken;
      } catch (error) {
        // Handle token refresh failure, e.g., log the error or logout the user
        console.error("Token refresh failed:", error);
        localStorage.removeItem('JWT');
        localStorage.removeItem('REFRESH_TOKEN');
        localStorage.removeItem('EXP_REFRESH');
        throw error; // Rethrow the error to propagate it further
      }
    } else {
      return jwtToken;
    }
  };
  

export default ValidateJWT;
