import React, { useEffect, useState } from 'react'
import { AccountLogo, AccountLogoActive, Cart, DesiCartIcon, SearchLogo, Wishlist } from '../assets/icons'
import { Link,useLocation } from 'react-router-dom'
import AccountDropdown from '../small-components/AccountDropdown';
import { useSelector } from 'react-redux';
import useBreakpoints from '../api/utilities/responsive';
const NavbarProductAdmin = () => {
  // const dispatch = useDispatch();

  const {isMobile} = useBreakpoints();
  
  const isLoggedIn = useSelector((state)=>{
    return state.user.isLoggedIn;
    })
  const routeLocation = useLocation().pathname;
  const [showDropDown,setShowDropdown]=useState(false);
  
  useEffect(()=>{

  },[isLoggedIn]);

const handleMouseEnter=()=>{
  setShowDropdown(true);
};
const handleMouseLeave=()=>{
  setShowDropdown(false);
}

//validation for visible acount logo
const accountLogoRoute = routeLocation ==='/login-signup' || routeLocation ==='/signup' || routeLocation ==='/login';

  return (
    <div className='navbar-container'>
      <Link className='navbar-logo-container' to='/'><DesiCartIcon/></Link>
      <div className='navbar-section-container'>
        <Link className='navbar-section-link'to='/product-admin/add-categories'>ADD CATEGORIES</Link>
        <Link className='navbar-section-link'>ADD PRODUCT</Link>
        <Link className='navbar-section-link'>ADD SKU</Link>
      </div>
    </div>
  )
}

export default NavbarProductAdmin;