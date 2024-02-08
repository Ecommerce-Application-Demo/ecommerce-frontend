import { createAsyncThunk } from "@reduxjs/toolkit";
import addressService from "../services/addressService";


//async thunk for view address
const viewAddress = createAsyncThunk(
    'VIEW_ADDRESS',
    async (data,thunkAPI) =>{
        try {
            console.log(data);
            const token = thunkAPI.getState().user.JWTtoken;
            return await addressService.viewAddress(token);
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)

//async thunk for add address
const addAddress = createAsyncThunk(
    'ADD_ADDRESS',
    async (data,thunkAPI) =>{
        try {
            const token = thunkAPI.getState().user.JWTtoken;
            return await addressService.addAddress(data,token);
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)

//async thunk for add address
const editAddress = createAsyncThunk(
    'EDIT_ADDRESS',
    async (data,thunkAPI) =>{
        try {
            const token = thunkAPI.getState().user.JWTtoken;
            return await addressService.editAddress(data,token);
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)

const removeAddress = createAsyncThunk(
    'REMOVE_ADDRESS',
    async (data,thunkAPI) =>{
        try {
            const token = thunkAPI.getState().user.JWTtoken;
            return await addressService.removeAddress(data,token);
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        } 
    }
)

const addressThunk = {
    viewAddress,
    addAddress,
    editAddress,
    removeAddress,
}
export default addressThunk;