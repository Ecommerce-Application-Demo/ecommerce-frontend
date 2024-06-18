import { toast } from "react-toastify";
import { resetProfileDetails } from "../../redux/Slices/profileSlice";
import { resetUserDetails } from "../../redux/Slices/userSlice";
import userApi from "../asyncThunk/userApi";
import { resetAddress } from "../../redux/Slices/addressSlice";


export const authenticateErrorHandler = (dispatch, error) => {
    // console.log(error, 'from error handler');
    // const error403 = error?.message?.includes('code 403') || false;
    // const error401 = error?.message?.includes('401') || false;
    // const error404 = error?.message?.includes('404') || false;
    // // const typeError = error?.name === 'TypeError';
    // const expiredJwt = error?.message?.includes('Invalid or missing JWT token') || error?.message?.includes('Error refreshing token');
    // console.log(error403);
    // if (error403 || error401 || expiredJwt || error404) {
        dispatch(resetProfileDetails());
        dispatch(resetUserDetails());
        dispatch(resetAddress());
    // }
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

//successName means success message of an api call, errorname means errormessage of an api call.
export const reduxInitialState = (successName, errorName) => {
    return {
            START: false,
            SUCCESS: false,
            FAIL: false,
            [successName]: null,
            [errorName]: null,
    }
}
//actionname=name of the state, payload=actual success or error response of api
export const updateState = (state, actionName, actionType, successName, errorName, payload=null) => {
    switch (actionType) {
        case 'pending':
            state[actionName].START = true;
            state[actionName].SUCCESS = false;
            state[actionName].FAIL = false;
            state[actionName][successName] = null;
            state[actionName][errorName] = null;
            break;
        case 'fulfilled':
            state[actionName].START = false;
            state[actionName].SUCCESS = true;
            state[actionName].FAIL = false;
            state[actionName][successName] = payload;
            state[actionName][errorName] = null;
            break;
        case 'rejected':
            state[actionName].START = false;
            state[actionName].SUCCESS = false;
            state[actionName].FAIL = true;
            state[actionName][successName] = null;
            state[actionName][errorName] = payload;
            break;
        default:
            console.error('Invalid actionType');
    }
};

export const objectToArrayConverter = (obj) => {
    return Object.values(obj)?.filter((image)=> (image !==null));
}
