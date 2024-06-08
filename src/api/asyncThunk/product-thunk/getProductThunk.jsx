import { createAsyncThunk } from "@reduxjs/toolkit";
import getProductMainService from "../../services/product-service/getProduct-service";

//async thunk for add all products
const getAllProductThunk = createAsyncThunk(
    'GET_ALL_PRODUCT',
    async (_,thunkAPI) =>{
        try {
           return getProductMainService.getAllProductService(); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);

//async thunk for get searched products
const getSearchedProductsThunk = createAsyncThunk(
    'GET_SEARCHED_PRODUCTS',
    async (searchingData,thunkAPI) =>{
        try {
           return getProductMainService.getSearchedProducts(searchingData); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);

//async thunk for infinity searched products
const getInfinitySearchedProductsThunk = createAsyncThunk(
    'GET_INFINITY_SEARCHED_PRODUCTS',
    async (searchedData,thunkAPI) =>{
        try {
           return getProductMainService.getInfinitySearchedProducts(searchedData); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);

//async thunk for infinity searched products
const getSearchedProductFilterThunk = createAsyncThunk(
    'GET_SEARCHED_PRODUCTS_FILTER',
    async (searchedData,thunkAPI) =>{
        try {
           return getProductMainService.getSearchedProductFilter(searchedData); 
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);

const getProductThunk = {
   getAllProductThunk,
   getSearchedProductsThunk,
   getInfinitySearchedProductsThunk,
   getSearchedProductFilterThunk,
}
export default getProductThunk;