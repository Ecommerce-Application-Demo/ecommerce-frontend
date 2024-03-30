import { createAsyncThunk } from "@reduxjs/toolkit";
import addressService from "../services/addressService";
import { toast } from "react-toastify";
import ValidateJWT from "../utilities/ResetLogin";
import userApi from "./userApi";

const expireTImeForRefreshToken = localStorage.getItem("EXP_REFRESH");
const currentTime = new Date();
//async thunk for view address
const viewAddress = createAsyncThunk(
    'VIEW_ADDRESS',
    async (_,thunkAPI) =>{
        try {
           return addressService.viewAddress(); 

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
            return await addressService.addAddress(data);
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
            return await addressService.editAddress(data);
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
            return await addressService.removeAddress(data);
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