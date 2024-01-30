import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../Slices/userSlice';
import otpSlice from '../Slices/otpSlice';

const store = configureStore({
    reducer:{
        user: userSlice,
        otp: otpSlice,
    }
});

export default store;