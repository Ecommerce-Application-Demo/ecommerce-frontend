import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { updateThemeFromLocalStorage } from '../redux/Slices/Theme/themeSlice';
import { useDispatch, useSelector } from 'react-redux'; // Importing useSelector

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.theme);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    localStorage.setItem('isDarkMode', JSON.stringify(newMode));
    document.body.classList.toggle('dark-mode', newMode);
    dispatch(updateThemeFromLocalStorage(newMode)); // Dispatching action with new mode
  };

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('isDarkMode')) || false;
    if (savedTheme !== null) {
      dispatch(updateThemeFromLocalStorage(savedTheme)); // Dispatching action with saved theme
      document.body.classList.toggle('dark-mode', savedTheme);
    }
  }, [dispatch]);

  return (
    <div className="toggle-container">
      <button className={`toggle-button ${isDarkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
        <AnimatePresence>
          {isDarkMode ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaMoon size={20} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaSun size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default ThemeToggle;
