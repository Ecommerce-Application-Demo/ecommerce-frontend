import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({children}) => {
    const isLoggedIn = useSelector(state=>state.user.isLoggedIn);
    if (!isLoggedIn) {
        toast.warning('you have to login first to access this page')
        return <Navigate to='/login-signup'/>
    } 
      return children;
    
}

export default ProtectedRoute