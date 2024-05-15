import { toast } from "react-toastify";
import { resetProfileDetails } from "../../redux/Slices/profileSlice";
import { resetUserDetails } from "../../redux/Slices/userSlice";
import userApi from "../asyncThunk/userApi";


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

export const GetPreviousLogin = async (dispatch) => {
    const previousLoginLocalStorage = localStorage.getItem('PREVIOUS_LOGIN') || "[]"; 
    const previousEmailsArray = JSON.parse(previousLoginLocalStorage);

    const validEmails = await Promise.all(previousEmailsArray.map(async (email) => {
        const dataForCheckEmail = {
            input: email,
        };

        try {
            const emailExist = await dispatch(userApi.isEmailExist(dataForCheckEmail)).unwrap();
            console.log(emailExist, 'email exist');

            if (emailExist) {
                return email;
            }
        } catch (error) {
            console.error("Error checking email existence:", error);
        }
    }));

    const uniqueEmails = [...new Set(validEmails.filter(email => email !== undefined))];

    console.log(uniqueEmails, 'unique emails');

    localStorage.setItem('PREVIOUS_LOGIN', JSON.stringify(uniqueEmails));

    return uniqueEmails;
};





export const addNewPreviousLogin = (newLoginData) => {
    console.log(newLoginData, 'newLoginData');
    const previousLoginLocalStorage = localStorage.getItem('PREVIOUS_LOGIN') || "[]";
    const previousLoginArray = JSON.parse(previousLoginLocalStorage);
    previousLoginArray.push(newLoginData);
    const addNewLoginStr = JSON.stringify(previousLoginArray);
    localStorage.setItem('PREVIOUS_LOGIN', addNewLoginStr);
}

