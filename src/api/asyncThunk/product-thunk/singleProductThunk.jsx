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

const singleProductThunk = {
  getSingleProductWithProductId,
  getProductWithStyleId,
};

export default singleProductThunk;