import { createSlice } from "@reduxjs/toolkit";
import getProductThunk from "../../../api/asyncThunk/product-thunk/getProductThunk";
import {
  reduxProfileInitialState,
  reduxProfileUpdateState,
} from "../../../api/utilities/stateHelper";

const { getAllProductThunk, getSearchedProductsThunk, getInfinitySearchedProductsThunk, getSearchedProductFilterThunk } = getProductThunk;

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
    SUCCESS: false,
    FAIL: false,
  },
  searchProductsFilterData: reduxProfileInitialState(
    "searchProductsFilter",
    "searchProductsFilterError"
  ),
};

const getProductsSlice = createSlice({
  name: "PRODUCTS",
  initialState,
  reducers: {
    resetSearchedProduct: (state) => {
      state.searchedProductsData = reduxProfileInitialState(
        "searchedProducts",
        "searchedProductsError",
        []
      )
    },
  },
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
        const { productList } = state.searchedProductsData.searchedProducts;
        state.searchedInfinityData.START = false;
        state.searchedProductsData.searchedProducts.productList = [...productList, ...action?.payload?.productList];
        state.searchedProductsData.searchedProducts.currentPage = action?.payload?.currentPage;
        state.searchedProductsData.searchedProducts.hasNextPage = action?.payload?.hasNextPage;
        state.searchedProductsData.searchedProductsError = null;
      })
      .addCase(getInfinitySearchedProductsThunk.rejected, (state, action) => {
        state.searchedProductsData.searchedProductsError = action?.payload;
        state.searchedInfinityData.START = false;
      })
      .addCase(getSearchedProductFilterThunk.pending, (state) => {
        reduxProfileUpdateState(
          state,
          "searchProductsFilterData",
          "pending",
          "searchProductsFilter",
          "searchedProductsError"
        );
      })
      .addCase(getSearchedProductFilterThunk.fulfilled, (state, action) => {
        reduxProfileUpdateState(
          state,
          "searchProductsFilterData",
          "fulfilled",
          "searchProductsFilter",
          "searchedProductsError",
          action?.payload
        );
      })
      .addCase(getSearchedProductFilterThunk.rejected, (state, action) => {
        reduxProfileUpdateState(
          state,
          "searchProductsFilterData",
          "rejected",
          "searchProductsFilter",
          "searchedProductsError",
          action?.payload
        );
      })
  },
});

export const {resetSearchedProduct} = getProductsSlice.actions;
export default getProductsSlice.reducer;
