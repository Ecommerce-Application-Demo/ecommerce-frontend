import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const usePreviousRoute = () => {
    const location = useLocation();
    const [previousLocation, setPreviousLocation] = useState(null);
  
    useEffect(() => {
      return () => {
        setPreviousLocation(location);
      };
    }, [location]);
  
    return previousLocation;
  };

export default usePreviousRoute;
