import React, { useEffect, useState } from 'react'
import { AccountLogo, AccountLogoActive, Cart, DesiCartIcon, SearchLogo, Wishlist } from '../assets/icons'
import { Link,useLocation } from 'react-router-dom'
import AccountDropdown from '../small-components/AccountDropdown';
import { useSelector } from 'react-redux';
import useBreakpoints from '../api/utilities/responsive';
const Navbar = () => {
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
      {!isMobile &&
      <>
      <div className='navbar-section-container'>
        <Link className='navbar-section-link'>HOME</Link>
        <Link className='navbar-section-link'>CONTACT</Link>
        <Link className='navbar-section-link'>ABOUT</Link>
      </div>
      <div className='navbar-search-container'>
        <input type='text' placeholder='what are you looking for?'/>
        <SearchLogo/>
      </div>
      <div className='navbar-right-container'>
        <Link to='/wishlist'><div><Wishlist/></div></Link>
        <Link to='/cart'><div><Cart/></div></Link>

       { !accountLogoRoute && 
       <div className='navbar-account-logo-wrapper' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {!showDropDown ?<AccountLogo /> :
          <AccountLogoActive />}
          {showDropDown &&<div className='navbar-account-dropdown-wrapper' onMouseEnter={handleMouseEnter}><AccountDropdown/></div>}
        </div> 
        }
      </div>
      </>
}
    </div>
  )
}

export default Navbar