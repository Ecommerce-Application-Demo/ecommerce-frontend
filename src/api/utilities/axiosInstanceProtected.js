import axios from "axios";
import { hostname } from "./utilites"; 
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";
// import store from "../../redux/store/Store";

class CustomError extends Error {
  constructor(message, type) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
  }
}

const axiosInstanceProtected = axios.create({
  baseURL: hostname,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("JWT")}`
  }
});

axiosInstanceProtected.interceptors.request.use(async (req) => {

  try {
    const decodeJwt = jwtDecode(localStorage.getItem("JWT"));
    const isJwtExpired = dayjs.unix(decodeJwt.exp).diff(dayjs()) < 1;
    if (isJwtExpired) {
      await refreshToken(); 
    } 
    req.headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`;
    return req;
  } catch (error) {
    if(error?.type !== 'UNAUTHORIZED') {
    throw new CustomError("Invalid or missing JWT token", "INVALID_JWT")
    }
  }
});

async function refreshToken() {
  const refreshToken = localStorage.getItem("REFRESH_TOKEN")?.toString() || null;
  const refreshTokenExpiry = localStorage.getItem("REFRESH_TOKEN_EXPIRY")?.toString() || null;

  if (refreshTokenExpiry && (dayjs().isAfter(dayjs.unix(refreshTokenExpiry)))) {
    localStorage.clear();
    Navigate('/login-signup');
    throw new CustomError('Unauthorized', 'UNAUTHORIZED');
  }
  try {
    const response = await axios.post(`${hostname}/api/auth/jwt-token`, {
      input: refreshToken,
    });
    console.log(response);
    localStorage.setItem('JWT', await response.data?.accessToken);
    localStorage.setItem('REFRESH_TOKEN_EXPIRY', await response.data?.refreshTokenExpiration);
    localStorage.setItem('USERNAME', await response.data?.name);
    localStorage.setItem('EMAIL', await response.data?.email);
    localStorage.setItem('REFRESH_TOKEN', await response.data?.refreshToken);

    return response.data?.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new CustomError("Error refreshing token", "REFRESH_ERROR");
  }
}

export default axiosInstanceProtected;
