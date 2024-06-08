import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    setIsVisible(scrolled > 300);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <motion.div className="scroll-to-top"
    onClick={scrollToTop}
    whileHover={{ scale: 1.1 }} 
    whileTap={{ scale: 0.8 }} 
    transition={{ duration: 0.2 }}  
    >
      {isVisible && (
        <div
          className="scroll-to-top-button"
        >
          ↑
        </div>
      )}
    </motion.div> 
  );
};

export default ScrollToTopButton;
