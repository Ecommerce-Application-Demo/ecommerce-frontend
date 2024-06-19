import axios from "axios";
import { hostname } from "./utilites"; 
import {jwtDecode} from "jwt-decode"; // Make sure this is imported correctly
import { toast } from "react-toastify";
import axiosInstanceNotProtected from "./axiosInstanceNotProtected";
import CustomError from "./CustomError";

const axiosInstanceProtected = axios.create({
  baseURL: hostname,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("JWT")}`
  }
});

axiosInstanceProtected.interceptors.request.use(async (req) => {
  try {
    const jwt = localStorage.getItem("JWT");
    console.log(jwt);

    if (!jwt) {
      throw new CustomError("JWT token is missing", "INVALID_JWT");
    }

    const decodeJwt = jwtDecode(jwt);
    console.log(decodeJwt);

    // Check if the token has expired
    const currentTime = Date.now() / 1000; // Current time in seconds
    const isJwtExpired = decodeJwt.exp < currentTime;
    console.log(isJwtExpired);

    if (isJwtExpired) {
      await refreshToken();
    }
    
    req.headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`;
    return req;
  } catch (error) {
    console.log(error, 'error from interceptor call');
    handleLogout();
    throw new CustomError("Invalid or missing JWT token", "INVALID_JWT");
  }
});

async function refreshToken() {
  const refreshToken = localStorage.getItem("REFRESH_TOKEN")?.toString() || null;
  const refreshTokenExpiry = localStorage.getItem("REFRESH_TOKEN_EXPIRY")?.toString() || null;

  if (refreshTokenExpiry && (Date.now() / 1000) > refreshTokenExpiry) {
    handleLogout();
    throw new CustomError("Error refreshing token", "REFRESH_ERROR");
  }
  try {
    const response = await axiosInstanceNotProtected.post(`/api/auth/jwt-token`, {
      input: refreshToken,
    });
    localStorage.setItem('JWT', response.data?.accessToken);
    localStorage.setItem('REFRESH_TOKEN_EXPIRY', response.data?.refreshTokenExpiration);
    localStorage.setItem('USERNAME', response.data?.name);
    localStorage.setItem('EMAIL', response.data?.email);
    localStorage.setItem('REFRESH_TOKEN', response.data?.refreshToken);

    return response.data?.accessToken;
  } catch (error) {
    throw new CustomError("Error refreshing token", "REFRESH_ERROR");
  }
}

function handleLogout() {
  localStorage.removeItem("JWT");
  localStorage.removeItem("REFRESH_TOKEN");
  localStorage.removeItem("USERNAME");
  localStorage.removeItem("EMAIL");
  localStorage.removeItem("REFRESH_TOKEN_EXPIRY");
  // throw new CustomError("User needs to login", "LOGOUT");
}

export default axiosInstanceProtected;
