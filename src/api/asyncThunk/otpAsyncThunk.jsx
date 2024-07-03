import {createAsyncThunk} from '@reduxjs/toolkit';
import otpService from '../services/otpService';

const generateOtp =createAsyncThunk(
    'GENERATE_OTP',
    async(email,thunkAPI)=>{
        try {
            return await otpService.generateOtp(email);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const validateOtp =createAsyncThunk(
    'VALIDATE_OTP',
    async(email,thunkAPI)=>{
        console.log(email);
        try {
            return await otpService.validateOtp(email);
        } catch (error) {
            // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const authGenerateOtp =createAsyncThunk(
    'AUTH_GENERATE_OTP',
    async(email,thunkAPI)=>{
        console.log(email);
        try {
            return await otpService.authenticateGenerateOtp(email);
        } catch (error) {
            // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const authValidateOtp =createAsyncThunk(
    'AUTH_VALIDATE_OTP',
    async(email,thunkAPI)=>{
        console.log(email);
        try {
            return await otpService.authenticateValidateOtp(email);
        } catch (error) {
            // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const otpAsyncThunk = {
    generateOtp,
    validateOtp,
    authGenerateOtp,
    authValidateOtp,
}

export default otpAsyncThunk;