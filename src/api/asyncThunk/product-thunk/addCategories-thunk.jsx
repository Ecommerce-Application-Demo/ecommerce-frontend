import { createAsyncThunk } from "@reduxjs/toolkit";
import addCategoriesProduct from "../../services/product-service/addCategories-service";

//async thunk for add master category
const addMasterCategory = createAsyncThunk(
    'ADD_MASTER_CATEGORY',
    async (masterCategory,thunkAPI) =>{
        try {
           return addCategoriesProduct.addMasterCategory(masterCategory); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)
//async thunk for add  category
const addCategory = createAsyncThunk(
    'ADD_CATEGORY',
    async (category,thunkAPI) =>{
        try {
           return addCategoriesProduct.addCategory(category); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);

//async thunk for add  sub category
const addSubCategory = createAsyncThunk(
    'ADD_SUB_CATEGORY',
    async (subCategory,thunkAPI) =>{
        try {
           return addCategoriesProduct.addSubCategory(subCategory); 

        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);

//async thunk for add  brand
const addBrand = createAsyncThunk(
    'ADD_BRAND',
    async (brand,thunkAPI) =>{
        try {
           return addCategoriesProduct.addBrand(brand); 
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
);
const addCategoriesProductThunk = {
   addMasterCategory,
   addCategory,
   addSubCategory,
   addBrand,
}
export default addCategoriesProductThunk;