import React from 'react';
import { DesiCartIconForLoading } from '../assets/icons';

const LoadingScreen = () => {

  return (
    <div className="loading-overlay">
      <div className="loading-icon"><DesiCartIconForLoading/></div>
    </div>
  );
};

export default LoadingScreen;
