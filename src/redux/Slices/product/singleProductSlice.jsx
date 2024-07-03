import { createSlice } from "@reduxjs/toolkit";
import {
  reduxProfileInitialState,
  reduxProfileUpdateState,
} from "../../../api/utilities/stateHelper";
import singleProductThunk from "../../../api/asyncThunk/product-thunk/singleProductThunk";

const { getProductWithStyleId, getSingleProductWithProductId, getProductMoreColors, checkDelivery } = singleProductThunk;

const storedAddress = JSON.parse(localStorage.getItem('ADDRESS')) || {
  pincode: '',
  addId: '',
  name: '',
};
const initialState = {
  productWithStyleidData: reduxProfileInitialState(
    "productWithStyleId",
    "productWithStyleIdError"
  ),
  productMoreColorsData: reduxProfileInitialState(
    "productMoreColors",
    "productMoreColorsError"
  ),
  isDeliverableData: {
    ...reduxProfileInitialState(
    "deliverableDetails",
    "isDeliverableError"),
    lowestDeliveryTime:'',
    isDeliverable: true,
  },
  addressForDeliveryOption: {
    addId: storedAddress.addId,
    name: storedAddress.name,
    pincode: storedAddress.pincode,
  },
  sizeForDeliveryOption: '',
};

const getSingleProductSlice = createSlice({
  name: 'PRODUCT',
  initialState,
  reducers: {
    addAddressForDeliveryOption: (state, action) => {
      state.addressForDeliveryOption = action?.payload;
      localStorage.setItem('ADDRESS', JSON.stringify(action?.payload));
    },
    deleteAddressForDeliveryOption: (state) => {
      state.addressForDeliveryOption = null;
      localStorage.removeItem('ADDRESS');
    },
    selectSizeForDeliveryOption: (state, action) => {
      state.sizeForDeliveryOption = action?.payload;
    },
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
        )
      })
      .addCase(checkDelivery.pending, (state) => {
        reduxProfileUpdateState(
          state,
          "isDeliverableData",
          "pending",
          "deliverableDetails",
          "isDeliverableError",
        );
        state.isDeliverableData.lowestDeliveryTime = '';
      })
      .addCase(checkDelivery.fulfilled, (state, action) => {
        reduxProfileUpdateState(
          state,
          "isDeliverableData",
          "fulfilled",
          "deliverableDetails",
          "isDeliverableError",
          action?.payload
        );
        state.isDeliverableData.lowestDeliveryTime = action?.payload?.deliveryTimeDetails?.[0]?.deliveryTime || 'Could not Delivery on this pincode.';
        state.isDeliverableData.isDeliverable = action?.payload?.isDeliverable || false;
      })
      .addCase(checkDelivery.rejected, (state, action) => {
        reduxProfileUpdateState(
          state,
          "isDeliverableData",
          "rejected",
          "deliverableDetails",
          "isDeliverableError",
          action?.payload
        );
        console.log(action);
        state.isDeliverableData.lowestDeliveryTime = action?.payload?.errorMessage;        ;
      })
  }
});

export const {
  addAddressForDeliveryOption,
  deleteAddressForDeliveryOption,
  selectSizeForDeliveryOption,
} = getSingleProductSlice.actions;

export default getSingleProductSlice.reducer;