import {createAsyncThunk} from '@reduxjs/toolkit';
import authService from '../services/authService';
import ValidateJWT from '../utilities/ResetLogin';
// import { resetUserDetails } from '../../redux/Slices/userSlice';
import { resetProfileDetails } from '../../redux/Slices/profileSlice';

// const Token =()=>{
//     const data =useSelector((state)=>{
//         return state.user;
//       })
//     const {JWT} = data;
//     return JWT;
// }
//async thunk for email check
 const isEmailExist =createAsyncThunk(
    'IS_EMAIL_EXIST',
    async(email,thunkAPI)=>{
        console.log(email);
        try {
            return await authService.emailCheck(email);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


//async thunk for register
const register =createAsyncThunk(
    'REGISTER',
    async(data,thunkAPI)=>{
        try {
            return await authService.register(data);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//async thunk for login
const login =createAsyncThunk(
    'LOGIN',
    async(data,thunkAPI)=>{
        try {
            return await authService.login(data);
        } catch (error) {
            console.log('error',error);
            const message = error.response.data || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//async thunk for logout
const logout = createAsyncThunk(
    'LOGOUT',
    async (_,thunkAPI) =>{
        try {
               return  authService.logout();
           }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)

//async thunk for logout
const logoutAllDevice = createAsyncThunk(
    'LOGOUT_ALL_DEVICE',
    async (_,thunkAPI) =>{
        try {
               return  authService.logoutAllDevice()
               .then(()=>{
                thunkAPI.dispatch(resetProfileDetails());
               })
           }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)

//async thunk for logout
const authenticateCall = createAsyncThunk(
    'INDEX',
    async (_,thunkAPI) =>{
        try {
               return  authService.authenticateCall();
           }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        } 
    }
)

const userApi = {
    isEmailExist,
    authenticateCall,
    register,
    login,
    logout,
    logoutAllDevice,
}
export default userApi;