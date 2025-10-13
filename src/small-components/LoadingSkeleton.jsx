import React from 'react'; 

export const LoadingSkeleton = ({ width = "100%", height = "20px" }) => {
    return (
      <div
        className="skeleton"
        style={{ width, height }}
      ></div>
    );
  };