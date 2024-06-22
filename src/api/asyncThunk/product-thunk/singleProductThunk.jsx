import { createAsyncThunk } from "@reduxjs/toolkit";
import SINGLEPRODUCTSERVICE from "../../services/product-service/getSingleProductService";

//async thunk for fetching single product with product id
const getSingleProductWithProductId = createAsyncThunk(
    'GET_SINGLE_PRODUCT_WITH_PROD_ID',
    async (productData,thunkAPI) =>{
        try {
           return SINGLEPRODUCTSERVICE.getSingleProductWithProductIdService(productData); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);

//async thunk for fetching single product
const getProductWithStyleId = createAsyncThunk(
  'GET_SINGLE_PRODUCT_WITH_STYLE_ID',
  async (styleData,thunkAPI) =>{
      try {
         return SINGLEPRODUCTSERVICE.getProductWithStyleIdServivce(styleData); 

      }
      catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
          return thunkAPI.rejectWithValue(message)
      } 
  }
);

//async thunk for fetching single product's other colors
const getProductMoreColors = createAsyncThunk(
    'GET_PRODUCT_MORECOLORS',
    async (styleData,thunkAPI) =>{
        try {
           return SINGLEPRODUCTSERVICE.getProductMoreColorsService(styleData); 
  
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
  );

//async thunk for fetching single product's other colors
const checkDelivery = createAsyncThunk(
    'CHECK_DELIVERY',
    async (deliveryDetails,thunkAPI) =>{
        try {
           return SINGLEPRODUCTSERVICE.checkDeliveryService(deliveryDetails); 
  
        }
        catch (error) {
            const message = (error?.response && error?.response.data && error?.response.data.message) || error?.message || error?.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
  );
const singleProductThunk = {
  getSingleProductWithProductId,
  getProductWithStyleId,
  getProductMoreColors,
  checkDelivery
};

export default singleProductThunk;