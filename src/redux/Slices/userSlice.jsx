import { createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/asyncThunk/userApi";

const loggedUser = localStorage.getItem("USERNAME");
const jwtToken = localStorage.getItem("JWT");
const refreshToken = localStorage.getItem("REFRESH_TOKEN");
const loggedInEmail = localStorage.getItem("EMAIL");

const { isEmailExist, register, login,logout } = userApi;
console.log(loggedUser);
const initialState = {
  msg: "",
  user: loggedUser ? loggedUser : null,
  token: "",
  isLoading: false,
  error: "",
  existEmail: false,
  isSuccess: false,
  JWTtoken: jwtToken ? jwtToken : "",
  isLoggedIn: jwtToken  ? true : false,
  refreshToken: refreshToken ? refreshToken : "",
  loggedInUserName: loggedUser ? loggedUser : "",
  loggedInEmail: loggedInEmail ? loggedInEmail : "",
};
const userSlice = createSlice({
  name: "USER",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.msg = "";
      state.isLoading = false;
      state.error = "";
      state.existEmail = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    //email check reducer
    builder
      .addCase(isEmailExist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isEmailExist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.existEmail = action.payload; 
        
        if (action.payload) {
          state.error = "";
          state.msg = "This email is already exist";
        } else {
          state.error = null;
          state.msg = "Email does not exist";
        }
      })
      
      .addCase(isEmailExist.rejected, (state, action) => {
        state.isLoading = false;
        state.existEmail = null;
        console.log(action.error);
        state.error = action.payload;
        state.isSuccess = false;
      })

      //register reducer
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.msg = 'user Logged in successfully'
        state.user = action.payload;
        state.isSuccess = true;
        state.JWTtoken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loggedInUserName = action.payload.name;
        state.loggedInEmail = action.payload.email;
        state.isLoggedIn = true;
        localStorage.setItem("JWT", action.payload.accessToken);
        localStorage.setItem("REFRESH_TOKEN", action.payload.refreshToken);
        localStorage.setItem("USERNAME", action.payload.name);
        localStorage.setItem("EMAIL", action.payload.email);
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.user = null;
        state.isSuccess = false;
        state.JWTtoken = "";
        state.refreshToken = "";
        state.loggedInUserName = "";
        state.loggedInEmail = "";
      })

      //login reducer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.msg = 'User Loggedin Successfully.'
        state.user = action.payload;
        state.isSuccess = true;
        state.JWTtoken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loggedInUserName = action.payload.name;
        state.loggedInEmail = action.payload.email;
        state.isLoggedIn = true;

        localStorage.setItem("JWT", action.payload.accessToken);
        localStorage.setItem("REFRESH_TOKEN", action.payload.refreshToken);
        localStorage.setItem("USERNAME", action.payload.name);
        localStorage.setItem("EMAIL", action.payload.email);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.user = null;
        state.isSuccess = false;
        state.JWTtoken = "";
        state.refreshToken = "";
        state.loggedInUserName = "";
        state.loggedInEmail = "";
        state.isLoggedIn = false;
      })


      //logout reducer
     .addCase(logout.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = '';
      state.isSuccess = true;
      state.JWTtoken = '';
      state.refreshToken = '';
      state.loggedInUserName = '';
      state.loggedInEmail = '';
      state.isLoggedIn = false;
      localStorage.removeItem("JWT");
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("USERNAME");
      localStorage.removeItem("EMAIL");
    })
    .addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
});

export default userSlice.reducer;
export const { reset } = userSlice.actions;
