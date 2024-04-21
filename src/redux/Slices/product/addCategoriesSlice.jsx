import { createSlice } from "@reduxjs/toolkit";
import addCategoriesProductThunk from "../../../api/asyncThunk/product-thunk/addCategories-thunk";

const { addMasterCategory, addCategory, addSubCategory, addBrand, addProduct, addProductSkuThunk } = addCategoriesProductThunk;

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
    },
    addProduct: { // Initial state for adding product
        START: false,
        SUCCESS: false,
        FAIL: false,
    },
    addProductSku: { // Initial state for adding product
        START: false,
        SUCCESS: false,
        FAIL: false,
    }
}

const addProductCategorySlice = createSlice({
    name: 'ADD_PRODUCT_CATEGORIES',
    initialState,
    reducers: {
        resetAddMasterCategory(state) {
            state.addMasterCategory = initialState.addMasterCategory;
        },
        resetAddCategory(state) {
            state.addCategory = initialState.addCategory;
        },
        resetAddSubCategory(state) {
            state.addSubCategory = initialState.addSubCategory;
        },
        resetAddBrand(state) {
            state.addBrand = initialState.addBrand;
        },
        resetAddProduct(state) { // Reset action for adding product
            state.addProduct = initialState.addProduct;
        },
        resetAddProductSku(state) {
            state.addProductSku = initialState.addProductSku;
          },
    },
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
        })
        .addCase(addProduct.pending, (state) => { // Pending case for adding product
            state.addProduct.START = true;
        })
        .addCase(addProduct.fulfilled, (state, action) => { // Fulfilled case for adding product
            state.addProduct.SUCCESS = true;
            state.addProduct.START = false;
        })
        .addCase(addProduct.rejected, (state, action) => { // Rejected case for adding product
            state.addProduct.FAIL = true;
            state.addProduct.START = false;
        })
        .addCase(addProductSkuThunk.pending, (state) => {
            state.addProduct.START = true;
          })
          .addCase(addProductSkuThunk.fulfilled, (state) => {
            state.addProduct.SUCCESS = true;
            state.addProduct.START = false;
          })
          .addCase(addProductSkuThunk.rejected, (state) => {
            state.addProduct.FAIL = true;
            state.addProduct.START = false;
          });
    }
});

export const { 
    resetAddMasterCategory,
    resetAddCategory,
    resetAddSubCategory,
    resetAddBrand,
    resetAddProduct // Export reset action for adding product
} = addProductCategorySlice.actions;

export default addProductCategorySlice.reducer;
