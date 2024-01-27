import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {hostname} from '../api/utilites';
export const isEmailExist =createAsyncThunk(
    'IS_EMAIL_EXIST',
    async(email)=>{
        console.log(email);
        const request = await axios.get(`${hostname}/api/auth/index`);
        const response = await request.data;
        return response;
    }
)