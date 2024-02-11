import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../Slices/userSlice';
import otpSlice from '../Slices/otpSlice';
import addressSlice from '../Slices/addressSlice';
import profileSlice from '../Slices/profileSlice';

const store = configureStore({
    reducer:{
        user: userSlice,
        otp: otpSlice,
        address:addressSlice,
        profile:profileSlice,
    }
});

export default store;