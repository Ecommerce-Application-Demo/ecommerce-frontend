import { createSlice } from "@reduxjs/toolkit";
import getCategoriesProductThunk from "../../../api/asyncThunk/product-thunk/getCategories-thunk";

const { getMasterCategory, getCategory } = getCategoriesProductThunk;

const initialState = {
    getMasterCategory: {
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    masterCategoryDetails: null,
    error:null,
    getCategory: {
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    categoryDetails: null,
}

const getProductCategorySlice = createSlice({
    name: 'GET_PRODUCT_CATEGORIES',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       builder
       .addCase(getMasterCategory.pending, (state) => {
           state.getMasterCategory.START = true;
       })
       .addCase(getMasterCategory.fulfilled, (state, action) => {
           state.getMasterCategory.SUCCESS = true;
           state.getMasterCategory.START = false;
           state.masterCategoryDetails = action.payload;
       })
       .addCase(getMasterCategory.rejected, (state, action) => {
           state.getMasterCategory.FAIL = true;
           state.getMasterCategory.START = false;
           state.error = action.payload;
       })
       .addCase(getCategory.pending, (state) => {
        state.getMasterCategory.START = true;
    })
    .addCase(getCategory.fulfilled, (state, action) => {
        state.getCategory.SUCCESS = true;
        state.getCategory.START = false;
        state.categoryDetails = action.payload;
    })
    .addCase(getCategory.rejected, (state, action) => {
        state.getCategory.FAIL = true;
        state.getCategory.START = false;
        state.error = action.payload;
    });
    }
});

export default getProductCategorySlice.reducer;
