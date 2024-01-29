import React, { useEffect } from 'react'
import { AccountLogo, CancelationLogo, LogoutLogo, OrderLogo, ReviewsLogo } from '../assets/icons';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../api/asyncThunk/userApi';
import { toast } from 'react-toastify';
import { reset } from '../redux/Slices/userSlice';

const AccountDropdown = () => {
  const routeLocation = useLocation().pathname;
  const navigate = useNavigate()
  const {logout} = userApi;
  const dispatch = useDispatch();
  const user = useSelector((state)=>{
    return state.user;
  })
  const {
    refreshToken,
    isLoggedIn,
  }=user;

  const handleLogout = () => {
    let data ={
      input : refreshToken
    } 
    dispatch(logout(data)).then(()=>{
      toast.success('User logged out successfully');
      dispatch(reset())
      navigate('/')
    })
  }
  return (
    <div className='accountDropdown-container'>
        <ul className='accountDropdown-wrapper'>
        {/* {routeLocation!='/login-signup' &&  */}
           {!isLoggedIn ? 
           <div className='accountDropdown-link-wrapper-nologgedin'>
           <b>WELCOME!!</b>
           <p>To Access account and manage orders</p>
           <Link to='/login-signup' className='accountDropdown-link-notlogin'>LOG IN/SIGN UP</Link>
           </div>
           :
           <>
            <Link to='/my/profile' className='accountDropdown-link'><li><AccountLogo color='white'/><span>Manage My Account</span></li></Link>
            <Link to='/my/order' className='accountDropdown-link'><li><OrderLogo/>My order</li></Link>
            <Link to='/my/cancelation' className='accountDropdown-link'><li><CancelationLogo/>My Cancelations</li></Link>
            <Link to='/my/reviews' className='accountDropdown-link'><li><ReviewsLogo/>My Reviews</li></Link>
            <Link onClick={handleLogout} style={{textDecoration:'none'}}><li><LogoutLogo/>Logout</li></Link>
            </>
           }
        </ul>
    </div>
  )
}

export default AccountDropdown;