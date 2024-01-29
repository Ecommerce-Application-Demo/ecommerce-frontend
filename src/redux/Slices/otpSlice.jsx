import {createSlice} from '@reduxjs/toolkit';
import { generateOtp } from '../../api/asyncThunk/otpApi';


const initialState = {
    sending:false,
    email:'',
    otpSend:false,
    error:'',
}
const otpSlice = createSlice({
    name: 'OTP',
    initialState:initialState,
    reducers:{
        resetOTP:(state)=>{
            state.sending = false
            state.email = ''
            state.otpSend = false
            state.error = ''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(generateOtp.pending,(state,action)=>{
            state.sending=true;
            state.email='';
            state.otpSend=false;
        })
        .addCase(generateOtp.fulfilled,(state,action)=>{
            state.sending = false;
            state.email = '';
            state.otpSend = action.payload? true:false;
            console.log(action);
        })
        .addCase(generateOtp.rejected,(state,action)=>{
            state.sending = false;
            state.email = '';
            state.otpSend = false;
            state.error = action.error.message;
        })
    }
})
export default otpSlice.reducer;
export const {resetOTP} =otpSlice.actions;