import { createSlice } from '@reduxjs/toolkit';
import otpAsyncThunk from '../../api/asyncThunk/otpAsyncThunk';
import { reduxInitialState, updateState } from '../../api/utilities/helper';

const { generateOtp, validateOtp, authGenerateOtp, authValidateOtp } = otpAsyncThunk;

const initialState = {
    isSending: false,
    emailForOtp: '',
    otpSend: false,
    error: '',
    isOtpValidate: false,
    authGenerateOtpData : reduxInitialState('otpSendSuccess', 'otpSendError'),
    authValidateOtpData : reduxInitialState('otpValidateSuccess', 'otpValidateError'),
}

const otpSlice = createSlice({
    name: 'OTP',
    initialState: initialState,
    reducers: {
        resetOTP: (state) => {
            state.isSending = false;
            state.emailForOtp = '';
            state.otpSend = false;
            state.error = '';
        },
        resetAuthGenerateOtp: (state) => {
            state.authGenerateOtpData = reduxInitialState('otpSendSuccess', 'otpSendError');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateOtp.pending, (state, action) => {
                state.isSending = true;
                state.emailForOtp = '';
                state.otpSend = false;
                state.isOtpValidate = false;
            })
            .addCase(generateOtp.fulfilled, (state, action) => {
                state.isSending = false;
                if (action.payload && action.payload.includes(':')) {
                    let email = action.payload.split(': ');
                    state.emailForOtp = email[1];
                }
                state.otpSend = action.payload ? true : false;
                console.log(action);
            })
            .addCase(generateOtp.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload;
                state.isOtpValidate = false;
            })
            .addCase(validateOtp.pending, (state) => {
                state.isSending = true;
                state.error = null;
            })
            .addCase(validateOtp.fulfilled, (state, action) => {
                state.isSending = false;
                state.emailForOtp = '';
                state.otpSend = action.payload ? true : false;
                console.log(action);
                state.isOtpValidate = true;
            })
            .addCase(validateOtp.rejected, (state, action) => {
                state.isSending = false;
                state.emailForOtp = '';
                state.otpSend = false;
                state.error = action.payload;
            })
            .addCase(authGenerateOtp.pending, (state) => {
                updateState(state, 'authGenerateOtpData', 'pending', 'otpSendSuccess', 'otpSendError', null);
            })
            .addCase(authGenerateOtp.fulfilled, (state, action) => {
                updateState(state, 'authGenerateOtpData', 'fulfilled', 'otpSendSuccess', 'otpSendError', action.payload);
            })
            .addCase(authGenerateOtp.rejected, (state, action) => {
                updateState(state, 'authGenerateOtpData', 'rejected', 'otpSendSuccess', 'otpSendError', action.payload);
            })
            .addCase(authValidateOtp.pending, (state) => {
                updateState(state, 'authValidateOtpData', 'pending', 'otpSendSuccess', 'otpSendError', null);

            })
            .addCase(authValidateOtp.fulfilled, (state, action) => {
                updateState(state, 'authValidateOtpData', 'fulfilled', 'otpSendSuccess', 'otpSendError', action.payload);
            })
            .addCase(authValidateOtp.rejected, (state, action) => {
                updateState(state, 'authValidateOtpData', 'rejected', 'otpSendSuccess', 'otpSendError', action.payload);
            })
    }
})

export default otpSlice.reducer;
export const { resetOTP, resetAuthGenerateOtp } = otpSlice.actions;
