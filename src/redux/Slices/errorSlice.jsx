import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   unAuthorizedError : null
}
const ErrorSlice = createSlice({
    name: 'ERROR',
    initialState:initialState,
    reducers:{
        resetError:(state)=>{
           state.unAuthorizedError = null
        },
        setUnauthorizedError:(state, action)=>{
            state.unAuthorizedError = action.payload;
        }
    },
})
export default ErrorSlice.reducer;
export const {resetError, setUnauthorizedError} =ErrorSlice.actions;