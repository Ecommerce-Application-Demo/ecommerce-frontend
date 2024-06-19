import { createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/asyncThunk/userApi";

const loggedUser = localStorage.getItem("USERNAME");
const jwtToken = localStorage.getItem("JWT");
const refreshToken = localStorage.getItem("REFRESH_TOKEN");
const loggedInEmail = localStorage.getItem("EMAIL");

const { isEmailExist, register, login,logout, logoutAllDevice } = userApi;
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
  logoutAllDevice: {
    START: false,
    SUCCESS: false,
    FAIL: false,
    successMsg: null,
    errorMsg: null,
  }
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
    resetUserDetails: (state) => {
      localStorage.removeItem("JWT");
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("USERNAME");
      localStorage.removeItem("EMAIL");
      localStorage.removeItem("REFRESH_TOKEN_EXPIRY");
      Object.keys(initialState).forEach((key) => {
        state[key] = null; 
      });
    }
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
        localStorage.setItem("REFRESH_TOKEN_EXPIRY", action.payload.refreshTokenExpiration);
        console.log(action.payload);
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
        localStorage.setItem("REFRESH_TOKEN_EXPIRY", action.payload.refreshTokenExpiration);
        console.log(action.payload);
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
      localStorage.removeItem("REFRESH_TOKEN_EXPIRY");
    })
    .addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isSuccess = false;
    })
     //logout all device reducer
     .addCase(logoutAllDevice.pending, (state) => {
      state.logoutAllDevice.START = true;
      state.logoutAllDevice.SUCCESS = false;
      state.logoutAllDevice.successMsg = null;
      state.logoutAllDevice.errorMsg = null;
    })
    .addCase(logoutAllDevice.fulfilled, (state, action) => {
      // Resetting all state properties except logoutAllDevice
      state.msg = initialState.msg;
      state.user = initialState.user;
      state.token = initialState.token;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
      state.existEmail = initialState.existEmail;
      state.isSuccess = initialState.isSuccess;
      state.JWTtoken = initialState.JWTtoken;
      state.isLoggedIn = initialState.isLoggedIn;
      state.refreshToken = initialState.refreshToken;
      state.loggedInUserName = initialState.loggedInUserName;
      state.loggedInEmail = initialState.loggedInEmail;
    
      // Update logoutAllDevice state
      state.logoutAllDevice.START = false;
      state.logoutAllDevice.SUCCESS = true;
      state.logoutAllDevice.successMsg = action?.payload;
      state.logoutAllDevice.errorMsg = null;
    
      // Remove JWT token from localStorage
      localStorage.removeItem("JWT");
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("USERNAME");
      localStorage.removeItem("EMAIL");
      localStorage.removeItem("REFRESH_TOKEN_EXPIRY");
    })
    
    .addCase(logoutAllDevice.rejected, (state, action) => {
      state.logoutAllDevice.START = false;
      state.logoutAllDevice.SUCCESS = false;
      state.logoutAllDevice.successMsg = null;
      state.logoutAllDevice.errorMsg = action.payload;
    })

  },
});

export const { reset, resetUserDetails } = userSlice.actions;
export default userSlice.reducer;
