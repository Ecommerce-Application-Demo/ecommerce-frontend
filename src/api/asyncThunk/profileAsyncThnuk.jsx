import { createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "../services/profileService";
import ValidateJWT from "../utilities/ResetLogin";


//async thunk for view profile
const viewProfile = createAsyncThunk(
    'VIEW_PROFILE',
    async (_,thunkAPI) =>{
        try {
               return  profileService.viewProfile();
           }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)

//async thunk for view profile
const editProfile = createAsyncThunk(
    'EDIT_PROFILE',
    async (formData,thunkAPI) =>{
        try {
               return  profileService.editProfile(formData);
           }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)


//async thunk for validate password
const validatePassword = createAsyncThunk(
    'VALIDATE_PASSWORD',
    async (currentPassword,thunkAPI) =>{
        try {
            return await profileService.validatePassword(currentPassword);
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)

//async thunk for change password 
const changePassword = createAsyncThunk(
    'CHANGE_PASSWORD',
    async (newPassword,thunkAPI) =>{
        try {
            const token = thunkAPI.getState().user.JWTtoken;
            return await profileService.changePassword(newPassword,token);
        }
        catch (error) {
            // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(error)
        } 
    }
)

//async thunk for change password 
const changeEmail = createAsyncThunk(
    'CHANGE_EMAIL',
    async (newEmail,thunkAPI) =>{
        try {
            return await profileService.changeEmail(newEmail);
        }
        catch (error) {
            // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(error)
        } 
    }
)

const profileThunk = {
  viewProfile,
  editProfile,
  validatePassword,
  changePassword,
  changeEmail,
}
export default profileThunk;