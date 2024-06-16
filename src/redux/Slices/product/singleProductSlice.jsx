import { createSlice } from "@reduxjs/toolkit";
import {
  reduxProfileInitialState,
  reduxProfileUpdateState,
} from "../../../api/utilities/stateHelper";
import singleProductThunk from "../../../api/asyncThunk/product-thunk/singleProductThunk";

const { getProductWithStyleId, getSingleProductWithProductId, getProductMoreColors } = singleProductThunk;

const initialState = {
  productWithStyleidData: reduxProfileInitialState(
    "productWithStyleId",
    "productWithStyleIdError"
  ),
  productMoreColorsData: reduxProfileInitialState(
    "productMoreColors",
    "productMoreColorsError"
  ),
};

const getSingleProductSlice = createSlice({
  name: 'PRODUCT',
  initialState,
  reducers: {
    // resetSearchedProduct: (state) => {
    //   state.searchedProductsData = reduxProfileInitialState(
    //     "searchedProducts",
    //     "searchedProductsError",
    //     []
    //   )
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductWithStyleId.pending, (state) => {
        reduxProfileUpdateState(
            state,
            "productWithStyleidData",
            "pending",
            "productWithStyleId",
            "productWithStyleIdError"
          );
      })
      .addCase(getProductWithStyleId.fulfilled, (state, action) => {
        reduxProfileUpdateState(
            state,
            "productWithStyleidData",
            "fulfilled",
            "productWithStyleId",
            "productWithStyleIdError",
            action?.payload
          );
      })
      .addCase(getProductWithStyleId.rejected, (state, action) => {
        reduxProfileUpdateState(
            state,
            "productWithStyleidData",
            "rejected",
            "productWithStyleId",
            "productWithStyleIdError",
            action?.payload
          );
      })
      .addCase(getProductMoreColors.pending, (state) => {
        reduxProfileUpdateState(
            state,
            "productMoreColorsData",
            "pending",
            "productMoreColors",
            "productMoreColorsError",
          );
      })
      .addCase(getProductMoreColors.fulfilled, (state, action) => {
        reduxProfileUpdateState(
            state,
            "productMoreColorsData",
            "fulfilled",
            "productMoreColors",
            "productMoreColorsError",
            action?.payload
          );
      })
      .addCase(getProductMoreColors.rejected, (state, action) => {
        reduxProfileUpdateState(
            state,
            "productMoreColorsData",
            "rejected",
            "productMoreColors",
            "productMoreColorsError",
            action?.payload
          );
      })
    }
});

export default getSingleProductSlice.reducer;