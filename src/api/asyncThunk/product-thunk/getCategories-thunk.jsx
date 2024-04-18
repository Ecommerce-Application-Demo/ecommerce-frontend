import { createAsyncThunk } from "@reduxjs/toolkit";
import getCategoriesProduct from "../../services/product-service/getCategories-service";

//async thunk for add master category
const getMasterCategory = createAsyncThunk(
    'GET_MASTER_CATEGORY',
    async (_,thunkAPI) =>{
        try {
           return getCategoriesProduct.getMasterCategory(); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);
//async thunk for add master category
const getCategory = createAsyncThunk(
    'GET_CATEGORY',
    async (_,thunkAPI) =>{
        try {
           return getCategoriesProduct.getCategory(); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)


const getCategoriesProductThunk = {
   getMasterCategory,
   getCategory,
}
export default getCategoriesProductThunk;