import React from 'react'
import { AccountLogo, CancelationLogo, LogoutLogo, OrderLogo, ReviewsLogo } from '../assets/icons';
import { Link } from 'react-router-dom';

const AccountDropdown = () => {
  return (
    <div className='accountDropdown-container'>
        <ul className='accountDropdown-wrapper'>
            <Link to='/my/profile' className='accountDropdown-link'><li><AccountLogo color='white'/><span>Manage My Account</span></li></Link>
            <Link to='/my/order' className='accountDropdown-link'><li><OrderLogo/>My order</li></Link>
            <Link to='/my/cancelation' className='accountDropdown-link'><li><CancelationLogo/>My Cancelations</li></Link>
            <Link to='/my/reviews' className='accountDropdown-link'><li><ReviewsLogo/>My Reviews</li></Link>
            <Link to='/my/logout' className='accountDropdown-link'><li><LogoutLogo/>Logout</li></Link>
        </ul>
    </div>
  )
}

export default AccountDropdown;