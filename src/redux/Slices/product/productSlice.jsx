import { createSlice } from "@reduxjs/toolkit";
import getProductThunk from "../../../api/asyncThunk/product-thunk/getProductThunk";

const {
    getAllProductThunk
} = getProductThunk;

const initialState = {
    getAllProduct: {
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    allProduct: null,
    errorGetAllProduct: null,
};

const getProductsSlice = createSlice({
    name: 'PRODUCT',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       builder
       .addCase(getAllProductThunk.pending, (state) => {
           state.getAllProduct.START = true;
       })
       .addCase(getAllProductThunk.fulfilled, (state, action) => {
           state.getAllProduct.SUCCESS = true;
           state.getAllProduct.START = false;
           state.allProduct = action.payload;
       })
       .addCase(getAllProductThunk.rejected, (state, action) => {
           state.getAllProduct.FAIL = true;
           state.getAllProduct.START = false;
           state.errorGetAllProduct = action.payload;
       });
    }
});

export default getProductsSlice.reducer;
