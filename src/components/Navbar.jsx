import React, { useState } from 'react'
import { AccountLogo, AccountLogoActive, Cart, MyntraLogo, SearchLogo, Wishlist } from '../assets/icons'
import { Link,useLocation } from 'react-router-dom'
import AccountDropdown from '../small-components/AccountDropdown';
const Navbar = () => {
  const routeLocation = useLocation().pathname;
  const [showDropDown,setShowDropdown]=useState(false);

const handleMouseEnter=()=>{
  setShowDropdown(true);
};
const handleMouseLeave=()=>{
  setShowDropdown(false);
}

  return (
    <div className='navbar-container'>
      <Link className='navbar-logo-container' to='/'><MyntraLogo/></Link>
      <div className='navbar-section-container'>
        <Link className='navbar-section-link'>HOME</Link>
        <Link className='navbar-section-link'>CONTACT</Link>
        <Link className='navbar-section-link'>ABOUT</Link>
        {routeLocation!='/login-signup' && <Link to='/login-signup' className='navbar-section-link'>LOG IN/SIGN UP</Link>}
      </div>
      <div className='navbar-search-container'>
        <input type='text' placeholder='what are you looking for?'/>
        <SearchLogo/>
      </div>
      <div className='navbar-right-container'>
        <div><Wishlist/></div>
        <div><Cart/></div>
        <div className='navbar-account-logo-wrapper' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {!showDropDown ?<AccountLogo /> :
          <AccountLogoActive />}
          {showDropDown &&<div className='navbar-account-dropdown-wrapper' onMouseEnter={handleMouseEnter}><AccountDropdown/></div>}
          </div> 
      </div>
    </div>
  )
}

export default Navbar