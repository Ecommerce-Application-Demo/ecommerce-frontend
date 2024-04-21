import { createAsyncThunk } from "@reduxjs/toolkit";
import getProductMainService from "../../services/product-service/getProduct-service";

//async thunk for add master category
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

const getProductThunk = {
   getAllProductThunk,
}
export default getProductThunk;