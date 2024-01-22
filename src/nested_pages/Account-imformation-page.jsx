import classNames from 'classnames';
import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import AddreessPage from '../pages/Address-page';
import ProfilePage from '../pages/Profile-page';
import OrderPage from '../pages/Order-page';
import ReturnPage from '../pages/Return-page';
import CancelationPage from '../pages/Cancelation-page';
import PaymentPage from '../pages/Payment-page';

const AccountImformation = () => {
    const [selectedDiv, setSelectedDiv]=useState(null);
    let route = useLocation().pathname;
    const navigate=useNavigate();
    
    const handleClick=(index)=>{
        setSelectedDiv(index);
        navigate(`/my/${index}`)
    };

    const subProfileChildStyles=classNames({
        'sidebar-subchild-non-active':route!=='/my/profile',
        'sidebar-subchild-active':route==='/my/profile',
    });
    const subAddressChildStyles=classNames({
        'sidebar-subchild-non-active':route!=='/my/address',
        'sidebar-subchild-active':route==='/my/address',
    });
    const subPaymentChildStyles=classNames({
        'sidebar-subchild-non-active':route!=='/my/payment',
        'sidebar-subchild-active':route==='/my/payment',
    })
    const subReturnChildStyles=classNames({
        'sidebar-subchild-non-active': route !== '/my/return',
        'sidebar-subchild-active':route==='/my/return',
    });
    const subCancelationChildStyles=classNames({
        'sidebar-subchild-non-active':route!=='/my/cancelation',
        'sidebar-subchild-active':route==='/my/cancelation',
    });
    const manageMyAccStyles=classNames({
        // 'sidebar-subchild-non-active':route!=='/my/cancelation',
        'sidebar-dt-active':route==='/my/profile' || route==='/my/address' || route==='/my/payment',
    });

  return (
    <div className='account-imformation-container'>
        <div className='account-imformation-roadmap-wrapper'>
            <div className='account-imformation-roadmap'>
            <span>Home</span>
            <span>/</span>
            <span>My Account</span>
            </div>
            <div>
              Welcome! <span className='login-account-name'>Kingshuk Roy</span>
            </div>
        </div>
        <div className='account-imformation-main-container'>
        <div className='account-imformation-sidebar-container'>
            <dl className='account-imformation-sidebar-wrapper'>
                <dt className={manageMyAccStyles}>Manage My Account</dt>
                <dd className={subProfileChildStyles} name='profile' onClick={() => handleClick('profile')}>My Profile</dd>
                <dd className={subAddressChildStyles} name='address' onClick={() => handleClick('address')}>Address Book</dd>
                <dd className={subPaymentChildStyles} name='payment' onClick={() => handleClick('payment')}>My Payment Options</dd>
            </dl>
            <dl className='account-imformation-sidebar-wrapper'>
                <dt> My Orders</dt>
                <dd className={subReturnChildStyles} name='return' onClick={() => handleClick('return')}>My Returns</dd>
                <dd className={subCancelationChildStyles} name='cancelation' onClick={() => handleClick('cancelation')}>My Cancelations</dd>
            </dl>
            <dl className='account-imformation-sidebar-wrapper'>
                <dt>My Wishlists</dt>
            </dl>
        </div>
        <div className="account-imformation-right-sidebar-container">
        {route==='/my/address' && <AddreessPage/>}
        {route==='/my/profile' && <ProfilePage/>}
        {route==='/my/order' && <OrderPage/>}
        {route==='/my/cancelation' && <CancelationPage/>}
        {route==='/my/return' && <ReturnPage/>}
        {route==='/my/payment' && <PaymentPage/>}
        </div>
        </div>
        </div>
  )
}

export default AccountImformation;