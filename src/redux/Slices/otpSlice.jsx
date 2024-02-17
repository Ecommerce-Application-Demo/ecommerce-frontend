import {createSlice} from '@reduxjs/toolkit';
import otpAsyncThunk from '../../api/asyncThunk/otpAsyncThunk';

const {generateOtp, validateOtp} = otpAsyncThunk;

const initialState = {
    isSending:false,
    emailForOtp:'',
    otpSend:false,
    error:'',
    isOtpValidate: false,
}
const otpSlice = createSlice({
    name: 'OTP',
    initialState:initialState,
    reducers:{
        resetOTP:(state)=>{
            state.isSending = false
            state.emailForOtp = ''
            state.otpSend = false
            state.error = ''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(generateOtp.pending,(state,action)=>{
            state.isSending=true;
            state.emailForOtp='';
            state.otpSend=false;
            state.isOtpValidate = false;
        })
        .addCase(generateOtp.fulfilled,(state,action)=>{
            state.isSending = false;
            if (action.payload && action.payload.includes(':')) {
                let email = action.payload.split(': ');
                state.emailForOtp = email[1];
            }
            state.otpSend = action.payload? true:false;
            console.log(action);
        })
        .addCase(generateOtp.rejected,(state,action)=>{
            state.isSending = false;
            state.error = action.payload;
            state.isOtpValidate = false;
        })
        .addCase(validateOtp.pending,(state)=>{
            state.isSending=true;
            state.error = null;
        })
        .addCase(validateOtp.fulfilled,(state,action)=>{
            state.isSending = false;
            state.emailForOtp = '';
            state.otpSend = action.payload? true:false;
            console.log(action);
            state.isOtpValidate = true;
        })
        .addCase(validateOtp.rejected,(state,action)=>{
            state.isSending = false;
            state.emailForOtp = '';
            state.otpSend = false;
            state.error = action.payload;
        })
    }
})
export default otpSlice.reducer;
export const {resetOTP} =otpSlice.actions;