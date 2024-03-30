import { configureStore } from '@reduxjs/toolkit';
// import {use} from '../Slices/userSlice';
import otpSlice from '../Slices/otpSlice';
import addressSlice from '../Slices/addressSlice';
import profileSlice from '../Slices/profileSlice';
import userSlice from '../Slices/userSlice';
import errorSlice from '../Slices/errorSlice';

const store = configureStore({
    reducer:{
        user: userSlice,
        otp: otpSlice,
        address:addressSlice,
        profile:profileSlice,
        error: errorSlice,
    }
});

export default store;