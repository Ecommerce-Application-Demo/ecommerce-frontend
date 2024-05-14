import { toast } from "react-toastify";
import { resetProfileDetails } from "../../redux/Slices/profileSlice";
import { resetUserDetails } from "../../redux/Slices/userSlice";


export const authenticateErrorHandler = (dispatch, error) => {
    console.log(error, 'from error handler');
    const error403 = error?.message?.includes('code 403') || false;
    const error401 = error?.message?.includes('401') || false;
    const error404 = error?.message?.includes('404') || false;
    const typeError = error?.name === 'TypeError';
    const expiredJwt = error?.message?.includes('Invalid or missing JWT token') || error?.message?.includes('Error refreshing token');
    console.log(error403);
    if (error403 || error401 || typeError || expiredJwt || error404) {
        dispatch(resetProfileDetails());
        dispatch(resetUserDetails());
    }
    if (expiredJwt || error404) {
        toast.info('your session is expired, try to login again.')
    }
}