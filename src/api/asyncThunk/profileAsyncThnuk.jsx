import { createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "../services/profileService";


//async thunk for view address
const viewProfile = createAsyncThunk(
    'VIEW_PROFILE',
    async (_,thunkAPI) =>{
        try {
            const token = thunkAPI.getState().user.JWTtoken;
            return await profileService.viewProfile(token);
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)


//async thunk for view address
const validatePassword = createAsyncThunk(
    'VALIDATE_PASSWORD',
    async (currentPassword,thunkAPI) =>{
        try {
            const token = thunkAPI.getState().user.JWTtoken;
            return await profileService.validatePassword(currentPassword,token);
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)


const profileThunk = {
  viewProfile,
  validatePassword,
}
export default profileThunk;