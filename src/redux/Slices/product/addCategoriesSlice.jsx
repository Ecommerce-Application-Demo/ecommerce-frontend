import { createSlice } from "@reduxjs/toolkit";
import addCategoriesProductThunk from "../../../api/asyncThunk/product-thunk/addCategories-thunk";

const { addMasterCategory,addCategory, addSubCategory, addBrand } = addCategoriesProductThunk;

const initialState = {
    addMasterCategory: {
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    addCategory: {
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    addSubCategory: {
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    addBrand: {
        START: false,
        SUCCESS: false,
        FAIL: false,
    }
}

const addProductCategorySlice = createSlice({
    name: 'ADD_PRODUCT_CATEGORIES',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       builder
       .addCase(addMasterCategory.pending, (state) => {
           state.addMasterCategory.START = true;
       })
       .addCase(addMasterCategory.fulfilled, (state, action) => {
           state.addMasterCategory.SUCCESS = true;
           state.addMasterCategory.START = false;
       })
       .addCase(addMasterCategory.rejected, (state, action) => {
           state.addMasterCategory.FAIL = true;
           state.addMasterCategory.START = false;
       })
       .addCase(addCategory.pending, (state) => {
        state.addCategory.START = true;
    })
    .addCase(addCategory.fulfilled, (state, action) => {
        state.addCategory.SUCCESS = true;
        state.addCategory.START = false;
    })
    .addCase(addCategory.rejected, (state, action) => {
        state.addCategory.FAIL = true;
        state.addCategory.START = false;
    })
    .addCase(addSubCategory.pending, (state) => {
        state.addSubCategory.START = true;
    })
    .addCase(addSubCategory.fulfilled, (state, action) => {
        state.addSubCategory.SUCCESS = true;
        state.addSubCategory.START = false;
    })
    .addCase(addSubCategory.rejected, (state, action) => {
        state.addSubCategory.FAIL = true;
        state.addSubCategory.START = false;
    })
    .addCase(addBrand.pending, (state) => {
        state.addBrand.START = true;
    })
    .addCase(addBrand.fulfilled, (state, action) => {
        state.addBrand.SUCCESS = true;
        state.addBrand.START = false;
    })
    .addCase(addBrand.rejected, (state, action) => {
        state.addBrand.FAIL = true;
        state.addBrand.START = false;
    });
    }
});

export default addProductCategorySlice.reducer;
