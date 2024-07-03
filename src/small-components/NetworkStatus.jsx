import React, { useState, useEffect } from 'react';
import offlineImage from '../assets/pictures/offline_images.png';
const OfflineComponent = () => {
  return (
    <div className='offline-container'>
        <img src={offlineImage} alt='offline' />
      <h1 className='offline-title'>Oops! You're Offline</h1>
      <p className='offline-description'>Don't worry, we'll be right here waiting for you when you reconnect. Until then, enjoy the peace and quiet of the offline world. Sometimes, it's nice to take a break from the internet and just chill.</p>
      <p className='offline-soon'>See you soon!</p>
    </div>
  );
};

const NetworkStatus = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline ? children : <OfflineComponent />;
};

export default NetworkStatus;
