import React from 'react'
import { AccountLogo, Cart, MyntraLogo, SearchLogo, Wishlist } from '../assets/icons'
import { Link,useLocation } from 'react-router-dom'
const Navbar = () => {
  const routeLocation = useLocation().pathname;
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
        <Wishlist/>
        <Cart/>
        <AccountLogo/>
      </div>
    </div>
  )
}

export default Navbar