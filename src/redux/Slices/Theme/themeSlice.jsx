import { createSlice } from "@reduxjs/toolkit";

const isDarkModeInLocalStorage = JSON.parse(localStorage.getItem('isDarkMode'));
const defaultDarkMode = isDarkModeInLocalStorage !== null ? isDarkModeInLocalStorage : false;

const initialState = {
  isDarkMode: defaultDarkMode,
}

const themeSlice = createSlice({
    name:'THEME',
    initialState,
    reducers:{
        updateThemeFromLocalStorage: (state) => {
            state.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
        }
    },  
})

export default themeSlice.reducer;

export const { updateThemeFromLocalStorage } = themeSlice.actions;
