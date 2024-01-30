import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { hostname } from '../utilites';

export const generateOtp = createAsyncThunk (
    'OTP_GENERATE',
    async(data)=>{
        const request = await axios.post(`${hostname}/api/auth/generate`,data)
        const response = await request.data;
        return response; 
    }
)