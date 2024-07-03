// GlobalErrorHandler.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { resetUserDetails } from '../../redux/Slices/userSlice';
import CustomError from '../api/utilities/CustomError';  // Adjust the path accordingly
import { resetProfileDetails } from '../redux/Slices/profileSlice';
import { resetUserDetails } from '../redux/Slices/userSlice';

const GlobalErrorHandler = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    console.log('error boundary');
    useEffect(() => {
      const handleError = (error) => {
      console.log(error instanceof CustomError, 'error custom');
      if (error instanceof CustomError) {
        dispatch(resetUserDetails());
        dispatch(resetProfileDetails());
        console.log('inside the if');
      } else {
        console.error(error);
      }
    };

    const errorHandler = (event) => {
      handleError(event.error);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, [dispatch, navigate]);

  return <>{children}</>;
};

export default GlobalErrorHandler;
