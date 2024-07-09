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

//async thunk for get all styles of a product
const getAllStylesOfProduct = createAsyncThunk(
    'GET_ALL_STYLES_PRODUCT',
    async (productId,thunkAPI) =>{
        try {
           return getProductMainService.getAllStylesOfProductService(productId); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);

//async thunk for get all styles of a product
const getAllSizesOfStyle = createAsyncThunk(
    'GET_ALL_SIZES_STYLE',
    async (styleId,thunkAPI) =>{
        try {
           return getProductMainService.getAllSizesOfStyleService(styleId); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);

//async thunk for get all styles of a product
const getAllWarehouse = createAsyncThunk(
    'GET_ALL_WAREHOUSE',
    async (_,thunkAPI) =>{
        try {
           return getProductMainService.getAllWarehouseService(); 

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
    async (dataForFilter,thunkAPI) =>{
        try {
           return getProductMainService.getSearchedProductFilter(dataForFilter); 
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
   getAllStylesOfProduct,
   getAllSizesOfStyle,
   getAllWarehouse,
}
export default getProductThunk;