import { createSlice } from '@reduxjs/toolkit'
import { isEmailExist } from '../../api/userApi';

const initialState = {
    msg: '',
    user:[],
    token:'',
    loading:false,
    error:'',
    existEmail: false,
}
const userSlice = createSlice({
  name: 'USER',
  initialState: initialState,
  reducers: {
  },
  extraReducers:(builder)=>{
    builder
    .addCase(isEmailExist.pending,(state)=>{
        state.loading = true;
        state.existEmail = false;
    })
    .addCase(isEmailExist.fulfilled,(state,action)=>{
        state.loading = false;
        state.existEmail = action.payload;
        if(state.existEmail === true) {
            state.error = 'this email is already exist';
            state.msg=''
        }else {
            state.error = null;
            state.msg = 'going to the login page';
            localStorage.setItem('MESSAGE', state.msg);
        }
    })
    .addCase(isEmailExist.rejected,(state,action)=>{
            state.loading = false;
            state.existEmail = null;
            console.log(action.error);
            state.error = action.error.message;
    })
  }
})
export default userSlice.reducer;
