import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../Slices/userSlice';
import otpSlice from '../Slices/otpSlice';
import addressSlice from '../Slices/addressSlice';

const store = configureStore({
    reducer:{
        user: userSlice,
        otp: otpSlice,
        address:addressSlice,
    }
});

export default store;