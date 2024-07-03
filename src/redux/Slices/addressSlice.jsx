import { createSlice } from "@reduxjs/toolkit";
import addressThunk from "../../api/asyncThunk/addressAsyncThunk";



const 
{
    viewAddress, 
    addAddress,
    editAddress,
    removeAddress,
} = addressThunk;

const initialState = {
    isAddressLoading:false,
    address:[],
    defaultAddress:null,
    isApiCallSuccess:false,
    successMsg:'',
    isError:false,
    error:'',
    editDeleteAddAddressSuccess : false,
}

const addressSlice = createSlice({
    name:'ADDRESS',
    initialState,
    reducers:{
        resetAddress: (state)=>{
            Object.assign(state, initialState);
          }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(viewAddress.pending, (state)=>{
            state.isAddressLoading = true;
            state.editDeleteAddAddressSuccess = false;
        })
        .addCase(viewAddress.fulfilled, (state,action)=>{
            state.isAddressLoading = false;
            state.address=action?.payload || [];
            console.log(action.payload);
            if ((action.payload !== 'No Address registered.')) {
                action.payload?.forEach((element) => {
                    if(element.default) {
                        state.defaultAddress = element
                    } 
                });
            }
            state.isApiCallSuccess = true;
            state.successMsg = 'these are the adresses';
        })
        .addCase(viewAddress.rejected, (state,action)=>{
            state.isAddressLoading = false;
            state.isApiCallSuccess = false;
            state.successMsg = '';
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(addAddress.pending, (state)=>{
            state.isAddressLoading = true;
        })
        .addCase(addAddress.fulfilled, (state,action)=>{
            state.isAddressLoading = false;
            state.editDeleteAddAddressSuccess = true;
            state.isApiCallSuccess = true;
            state.successMsg = 'these are the adresses';
        })
        .addCase(addAddress.rejected, (state,action)=>{
            state.isAddressLoading = false;
            // state.address.push(action.payload);
            state.isApiCallSuccess = false;
            state.successMsg = '';
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(editAddress.pending, (state)=>{
            state.isAddressLoading = true;
        })
        .addCase(editAddress.fulfilled, (state,action)=>{
            state.isAddressLoading = false;
            state.editDeleteAddAddressSuccess = true;
            state.isApiCallSuccess = true;
            state.successMsg = 'these are the adresses';
        })
        .addCase(editAddress.rejected, (state,action)=>{
            state.isAddressLoading = false;
            // state.address.push(action.payload);
            state.isApiCallSuccess = false;
            state.successMsg = '';
            state.isError = true;
            state.error = action.payload;
        })
        .addCase(removeAddress.pending, (state)=>{
            state.isAddressLoading = true;
            state.editDeleteAddAddressSuccess = false;
        })
        .addCase(removeAddress.fulfilled, (state,action)=>{
            state.isAddressLoading = false;
            state.editDeleteAddAddressSuccess = true;
            state.isApiCallSuccess = true;
            state.successMsg = 'successfully deleted';
        })
        .addCase(removeAddress.rejected, (state,action)=>{
            state.isAddressLoading = false;
            // state.address.push(action.payload);
            state.isApiCallSuccess = false;
            state.successMsg = '';
            state.isError = true;
            state.error = action.payload;
        })
        // .addMatcher(action => action.type === addAddress.fulfilled.type, (state) => {
        //     state.editDeleteAddAddressSuccess = false;
        // });
    }
})
export const {resetAddress} = addressSlice.actions;
export default addressSlice.reducer;