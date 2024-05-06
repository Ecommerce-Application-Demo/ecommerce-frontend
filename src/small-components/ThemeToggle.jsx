import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // Save theme preference in localStorage
    localStorage.setItem('isDarkMode', JSON.stringify(newMode));
    // Update class on body for global styling
    document.body.classList.toggle('dark-mode', newMode);
  };

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('isDarkMode')) || false;
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme);
      document.body.classList.toggle('dark-mode', savedTheme);
    }
  }, []);

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
