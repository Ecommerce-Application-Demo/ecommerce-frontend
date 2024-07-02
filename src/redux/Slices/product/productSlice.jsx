import { createSlice } from "@reduxjs/toolkit";
import getProductThunk from "../../../api/asyncThunk/product-thunk/getProductThunk";
import {
  reduxProfileInitialState,
  reduxProfileUpdateState,
} from "../../../api/utilities/stateHelper";

const { getAllProductThunk, getSearchedProductsThunk, getInfinitySearchedProductsThunk, getSearchedProductFilterThunk, getAllStylesOfProduct, getAllSizesOfStyle, getAllWarehouse } = getProductThunk;

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
  allStylesOfProductData: reduxProfileInitialState(
    "allStylesOfProduct",
    "allStylesOfProductError"
  ),
  allSizesOfStyleData: reduxProfileInitialState(
    "allSizesOfStyle",
    "allSizesOfStyleError"
  ),
  allWarehouseData: reduxProfileInitialState(
    "allWarehouse",
    "allWarehouseError"
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
      .addCase(getAllStylesOfProduct.pending, (state) => {
        reduxProfileUpdateState(
          state,
          "allStylesOfProductData",
          "pending",
          "allStylesOfProduct",
          "allStylesOfProductError"
        );
      })
      .addCase(getAllStylesOfProduct.fulfilled, (state, action) => {
        reduxProfileUpdateState(
          state,
          "allStylesOfProductData",
          "fulfilled",
          "allStylesOfProduct",
          "allStylesOfProductError",
          action?.payload
        );
      })
      .addCase(getAllStylesOfProduct.rejected, (state, action) => {
        reduxProfileUpdateState(
          state,
          "allStylesOfProductData",
          "rejected",
          "allStylesOfProduct",
          "allStylesOfProductError",
          action?.payload
        );
      })
      .addCase(getAllSizesOfStyle.pending, (state) => {
        reduxProfileUpdateState(
          state,
          "allSizesOfStyleData",
          "pending",
          "allSizesOfStyle",
          "allSizesOfStyleError"
        );
      })
      .addCase(getAllSizesOfStyle.fulfilled, (state, action) => {
        reduxProfileUpdateState(
          state,
          "allSizesOfStyleData",
          "fulfilled",
          "allSizesOfStyle",
          "allSizesOfStyleError",
          action?.payload
        );
      })
      .addCase(getAllSizesOfStyle.rejected, (state, action) => {
        reduxProfileUpdateState(
          state,
          "allSizesOfStyleData",
          "rejected",
          "allSizesOfStyle",
          "allSizesOfStyleError",
          action?.payload
        );
      })
      .addCase(getAllWarehouse.pending, (state) => {
        reduxProfileUpdateState(
          state,
          "allWarehouseData",
          "pending",
          "allWarehouse",
          "allWarehouseError"
        );
      })
      .addCase(getAllWarehouse.fulfilled, (state, action) => {
        reduxProfileUpdateState(
          state,
          "allWarehouseData",
          "fulfilled",
          "allWarehouse",
          "allWarehouseError",
          action?.payload
        );
      })
      .addCase(getAllWarehouse.rejected, (state, action) => {
        reduxProfileUpdateState(
          state,
          "allWarehouseData",
          "rejected",
          "allWarehouse",
          "allWarehouseError",
          action?.payload
        );
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
