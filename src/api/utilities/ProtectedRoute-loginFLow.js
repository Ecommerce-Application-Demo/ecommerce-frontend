import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRouteLogin = ({children}) => {
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn);
    if (isLoggedIn) {
        return <Navigate to='/'/>
    }  
      return children;
    
}

export default ProtectedRouteLogin;