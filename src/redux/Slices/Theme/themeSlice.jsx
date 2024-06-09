import { createSlice } from "@reduxjs/toolkit";

const isDarkModeInLocalStorage = JSON.parse(localStorage.getItem('isDarkMode'));
const defaultDarkMode = isDarkModeInLocalStorage !== null ? isDarkModeInLocalStorage : false;

const initialState = {
  isDarkMode: defaultDarkMode,
  enableNavbar : true,
  enableSearchbar: true,
  enableFooter: true,
}

const themeSlice = createSlice({
    name:'THEME',
    initialState,
    reducers:{
        updateThemeFromLocalStorage: (state) => {
            state.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
        },
        enableNavbarAction: (state, action) => {
            state.enableNavbar = action?.payload;
        },
        enableSearchbarAction: (state, action) => {
            state.enableSearchbar = action?.payload;
        },
        enableFooterAction: (state, action) => {
            state.enableFooter = action?.payload;
        }
    },  
})

export default themeSlice.reducer;

export const { updateThemeFromLocalStorage, enableNavbarAction,enableFooterAction, enableSearchbarAction } = themeSlice.actions;
