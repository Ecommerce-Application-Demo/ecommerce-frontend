
import { createSlice } from "@reduxjs/toolkit";
import profileThunk from "../../api/asyncThunk/profileAsyncThnuk";
// import { resetUserDetails } from "./userSlice";

const 
{
   viewProfile,
   editProfile,
   validatePassword,
   changePassword,
} = profileThunk;

const initialState = {
    isProfileLoading:false,
    profile:null,
    isApiCallSuccess:false,
    successMsg:'',
    isError:false,
    isVerifiedPassword:null,
    error:'',
   editProfile: {
    editProfileLoading: false,
    editProfileMsg: null,
    editProfileSuccess: false,
    editProfileFail:false,
    editProfileError:null,
   },
    editDeleteProfileSuccess : false,
    changePassword : false,
}

const profileSlice = createSlice({
    name:'PROFILE',
    initialState,
    reducers:{
        resetPasswordVerification: (state) => {
           state.isVerifiedPassword = null;
          },
          resetProfileDetails: (state)=>{
            Object.assign(state, initialState);
            localStorage.removeItem("JWT");
            localStorage.removeItem("REFRESH_TOKEN");
            localStorage.removeItem("USERNAME");
            localStorage.removeItem("EMAIL");
            localStorage.removeItem("REFRESH_TOKEN_EXPIRY");
          }
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
        .addCase(editProfile.pending, (state)=>{
                state.editProfile = {
                    ...state.editProfile,
                    editProfileLoading: true,
                    editProfileSuccess: false,
                    editProfileFail: false,
                    editProfileError: null,
                };    
        })
        .addCase(editProfile.fulfilled, (state,action)=>{
                state.profile = action.payload;
                state.editProfile = {
                    ...state.editProfile,
                    editProfileLoading: false,
                    editProfileSuccess: true,
                    editProfileMsg: action.payload,
                    editProfileFail: false,
                    editProfileError: null,
                };       
        })
        .addCase(editProfile.rejected, (state,action)=>{
            state.editProfile = {
                ...state.editProfile,
                editProfileLoading: false,
                editProfileSuccess: false,
                editProfileMsg: null,
                editProfileFail: true,
                editProfileError: action.payload,
            };       
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
        .addCase(changePassword.pending, (state)=>{
            state.isPasswordLoading = true;
        })
        .addCase(changePassword.fulfilled, (state,action)=>{
            Object.assign(state, initialState);
            state.changePassword = true;
            localStorage.clear();
            
        })
        .addCase(changePassword.rejected, (state,action)=>{
            state.isPasswordLoading = false;
            state.changePassword = false;
            state.error = action.payload;
        })
    }
})

export default profileSlice.reducer;
export const { resetPasswordVerification, resetProfileDetails } = profileSlice.actions;
