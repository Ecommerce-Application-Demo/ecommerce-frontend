
import { createSlice } from "@reduxjs/toolkit";
import profileThunk from "../../api/asyncThunk/profileAsyncThnuk";



const 
{
   viewProfile,
   validatePassword,
} = profileThunk;

const initialState = {
    isProfileLoading:false,
    profile:null,
    isApiCallSuccess:false,
    successMsg:'',
    isError:false,
    isVerifiedPassword:null,
    error:'',
    editDeleteProfileSuccess : false,
}

const profileSlice = createSlice({
    name:'PROFILE',
    initialState,
    reducers:{
        resetPasswordVerification: (state) => {
           state.isVerifiedPassword = null;
          },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(viewProfile.pending, (state)=>{
            state.isProfileLoading = true;
            state.editDeleteProfileSuccess = false;
        })
        .addCase(viewProfile.fulfilled, (state,action)=>{
            state.isProfileLoading = false;
            state.profile=action.payload;
            console.log(action.payload);
            state.isApiCallSuccess = true;
            state.successMsg = 'available';
        })
        .addCase(viewProfile.rejected, (state,action)=>{
            state.isProfileLoading = false;
            state.isApiCallSuccess = false;
            state.successMsg = '';
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(validatePassword.pending, (state)=>{
            state.isPasswordLoading = true;
            state.editDeleteProfileSuccess = false;
        })
        .addCase(validatePassword.fulfilled, (state,action)=>{
            state.isPasswordLoading = false;
            state.isVerifiedPassword = action.payload;
            state.editDeleteProfileSuccess = true;
        })
        .addCase(validatePassword.rejected, (state,action)=>{
            state.isPasswordLoading = false;
            state.isApiCallSuccess = false;
            state.successMsg = '';
            state.isError = true;
            state.isVerifiedPassword = false;
            state.error = action.payload;
        })
    }
})

export default profileSlice.reducer;
export const { resetPasswordVerification } = profileSlice.actions;
