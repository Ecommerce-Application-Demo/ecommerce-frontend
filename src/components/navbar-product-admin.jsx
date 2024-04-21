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

  return (
    <div className='navbar-container'>
      <Link className='navbar-logo-container' to='/'><DesiCartIcon/></Link>
    </div>
  )
}

export default NavbarProductAdmin;