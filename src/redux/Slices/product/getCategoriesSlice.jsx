import { createSlice } from "@reduxjs/toolkit";
import getCategoriesProductThunk from "../../../api/asyncThunk/product-thunk/getCategories-thunk";

const {
    getMasterCategory,
    getCategory,
    getSubCategory, // Add support for fetching subcategories
    getBrand
} = getCategoriesProductThunk;

const initialState = {
    getMasterCategory: {
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    masterCategoryDetails: null,
    error: null,
    getCategory: {
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    categoryDetails: null,
    getSubCategory: { // Initial state for subcategories
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    subCategoryDetails: null, // State to hold subcategory data
    getBrand: {
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    brandDetails: null,
};

const getProductCategorySlice = createSlice({
    name: 'GET_PRODUCT_CATEGORIES',
    initialState,
    reducers: {
        resetGetSubCategory(state) {
            state.subCategoryDetails = initialState.subCategoryDetails;
            state.getSubCategory = initialState.getSubCategory;
        },
    },
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
           state.getCategory.START = true;
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
       })
       .addCase(getSubCategory.pending, (state) => { // Pending case for fetching subcategories
           state.getSubCategory.START = true;
       })
       .addCase(getSubCategory.fulfilled, (state, action) => { // Fulfilled case for fetching subcategories
           state.getSubCategory.SUCCESS = true;
           state.getSubCategory.START = false;
           state.subCategoryDetails = action.payload;
       })
       .addCase(getSubCategory.rejected, (state, action) => { // Rejected case for fetching subcategories
           state.getSubCategory.FAIL = true;
           state.getSubCategory.START = false;
           state.error = action.payload;
       })
       .addCase(getBrand.pending, (state) => {
           state.getBrand.START = true;
       })
       .addCase(getBrand.fulfilled, (state, action) => {
           state.getBrand.SUCCESS = true;
           state.getBrand.START = false;
           state.brandDetails = action.payload;
       })
       .addCase(getBrand.rejected, (state, action) => {
           state.getBrand.FAIL = true;
           state.getBrand.START = false;
           state.error = action.payload;
       });
    }
});

export const {
    resetGetSubCategory,
} = getProductCategorySlice.actions;

export default getProductCategorySlice.reducer;
