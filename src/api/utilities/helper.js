import { toast } from "react-toastify";
import { resetProfileDetails } from "../../redux/Slices/profileSlice";
import { resetUserDetails } from "../../redux/Slices/userSlice";


export const authenticateErrorHandler = (dispatch, error) => {
    console.log(error, 'from error handler');
    const error403 = error?.message?.includes('code 403') || false;
    const error500 = error?.message?.includes('401') || false;
    const typeError = error?.name === 'TypeError';
    console.log(error403);
    if (error403 || error500 || typeError) {
        dispatch(resetProfileDetails());
        dispatch(resetUserDetails());
    }
    if (error500) {
        toast.info('your session is expired, try to login again.')
    }
}