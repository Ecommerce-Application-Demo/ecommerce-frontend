import { createSlice } from "@reduxjs/toolkit";
import getProductThunk from "../../../api/asyncThunk/product-thunk/getProductThunk";
import {
  reduxProfileInitialState,
  reduxProfileUpdateState,
} from "../../../api/utilities/stateHelper";

const { getAllProductThunk, getSearchedProductsThunk, getInfinitySearchedProductsThunk } = getProductThunk;

const initialState = {
  getAllProduct: {
    START: false,
    SUCCESS: false,
    FAIL: false,
  },
  allProduct: null,
  errorGetAllProduct: null,
  searchedProductsData: reduxProfileInitialState(
    "searchedProducts",
    "searchedProductsError",
    []
  ),
  searchedInfinityData: {
    START: false,
    SUCCESS:false,
    FAIL:false,
  }
};

const getProductsSlice = createSlice({
  name: "PRODUCT",
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
      })
      .addCase(getSearchedProductsThunk.pending, (state) => {
        reduxProfileUpdateState(
          state,
          "searchedProductsData",
          "pending",
          "searchedProducts",
          "searchedProductsError"
        );
      })
      .addCase(getSearchedProductsThunk.fulfilled, (state, action) => {
        reduxProfileUpdateState(
          state,
          "searchedProductsData",
          "fulfilled",
          "searchedProducts",
          "searchedProductsError",
          action?.payload
        );
      })
      .addCase(getSearchedProductsThunk.rejected, (state, action) => {
        reduxProfileUpdateState(
          state,
          "searchedProductsData",
          "rejected",
          "searchedProducts",
          "searchedProductsError",
          action?.payload
        );
      })
      .addCase(getInfinitySearchedProductsThunk.pending, (state) => {
        state.searchedInfinityData.START = true;
        state.searchedProductsData.searchedProductsError = null;
      })
      .addCase(getInfinitySearchedProductsThunk.fulfilled, (state, action) => {
        const {productList} = state.searchedProductsData.searchedProducts;
        state.searchedInfinityData.START = false;
        state.searchedProductsData.searchedProducts.productList = [...productList,...action?.payload?.productList];
        state.searchedProductsData.searchedProductsError = null;
      })
      .addCase(getInfinitySearchedProductsThunk.rejected, (state, action) => {
        state.searchedProductsData.searchedProductsError = action?.payload;
        state.searchedInfinityData.START = false;
      });
  },
});

export default getProductsSlice.reducer;
