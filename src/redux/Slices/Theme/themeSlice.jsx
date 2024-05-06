import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode:JSON.parse(localStorage.getItem('isDarkMode')) || false,
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
