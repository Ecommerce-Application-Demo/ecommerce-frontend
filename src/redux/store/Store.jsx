import { configureStore } from '@reduxjs/toolkit';
// import {use} from '../Slices/userSlice';
import otpSlice from '../Slices/otpSlice';
import addressSlice from '../Slices/addressSlice';
import profileSlice from '../Slices/profileSlice';
import userSlice from '../Slices/userSlice';
import errorSlice from '../Slices/errorSlice';
import addCategoriesSlice from '../Slices/product/addCategoriesSlice';
import getCategoriesSlice from '../Slices/product/getCategoriesSlice';
import getProductsSlice from '../Slices/product/productSlice';
import themeSlice from '../Slices/Theme/themeSlice';

const store = configureStore({
    reducer:{
        user: userSlice,
        otp: otpSlice,
        address:addressSlice,
        profile:profileSlice,
        error: errorSlice,
        addProductCategory: addCategoriesSlice,
        getProductCategory: getCategoriesSlice,
        getProducts: getProductsSlice,
        theme: themeSlice,
    }
});

export default store;