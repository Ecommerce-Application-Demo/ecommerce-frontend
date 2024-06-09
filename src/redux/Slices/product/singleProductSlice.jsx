import { createSlice } from "@reduxjs/toolkit";
import {
  reduxProfileInitialState,
  reduxProfileUpdateState,
} from "../../../api/utilities/stateHelper";
import singleProductThunk from "../../../api/asyncThunk/product-thunk/singleProductThunk";

const { getProductWithStyleId, getSingleProductWithProductId } = singleProductThunk;

const initialState = {
  productWithStyleidData: reduxProfileInitialState(
    "productWithStyleId",
    "productWithStyleIdError"
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
    }
});

export default getSingleProductSlice.reducer;