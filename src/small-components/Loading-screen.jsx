import React, { useEffect, useState } from 'react';
import { DesiCartIconForLoading } from '../assets/icons';

const LoadingScreen = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") return "";
        return prevDots + ".";
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-icon"><DesiCartIconForLoading/></div>
      {/* <p className="loading-text">Loading<span className="loading-dots dot-animation">{dots}</span></p> */}
    </div>
  );
};

export default LoadingScreen;
