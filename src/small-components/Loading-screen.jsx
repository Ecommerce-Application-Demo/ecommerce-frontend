import React, { useState } from 'react';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(!loading);
  };

  const handleButtonClick = () => {
    toggleLoading();
    // Simulate an asynchronous operation
    setTimeout(() => {
      toggleLoading();
    }, 2000);
  };

  return (
    <div>
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      {/* Your background content */}
    </div>
  );
};

export default LoadingScreen;
