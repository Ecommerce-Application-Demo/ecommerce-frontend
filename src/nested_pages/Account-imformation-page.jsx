import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation,Link } from 'react-router-dom';
import AddreessPage from '../pages/Address-page';
import ProfilePage from '../pages/Profile-page';
import OrderPage from '../pages/Order-page';
import ReturnPage from '../pages/Return-page';
import CancelationPage from '../pages/Cancelation-page';
import PaymentPage from '../pages/Payment-page';
import { useSelector } from 'react-redux';

const AccountImformation = () => {
    // const [selectedDiv, setSelectedDiv]=useState(null);
    const [pageName,setPageName]=useState('Manage Your Account');
    const route = useLocation().pathname;
    const navigate=useNavigate();
    const addressCount = useSelector(state=> state.address.address.length);
    const loggedInUserName = useSelector(state=> state.user.loggedInUserName);
    useEffect(()=>{
        switch (route) {
            case '/my/profile':
                    setPageName('Profile')
                break;
            case '/my/address':setPageName('Address')
                break;
                case '/my/order':
                    setPageName('Order')
                break;
                case '/my/return':
                    setPageName('Return')
                break;
                case '/my/cancelation':
                    setPageName('Cancelations')
                break;
                case '/my/payment':
                    setPageName('Payment')
                break;
            default:
                break;
        }
    },[route]);


    const handleClick=(index)=>{
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
    const subOrderChildStyles=classNames({
        'sidebar-subchild-non-active':route!=='/my/order',
        'sidebar-subchild-active':route==='/my/order',
    });
    const manageMyAccStyles=classNames({
        'sidebar-dt-active':route==='/my/profile' || route==='/my/address' || route==='/my/payment',
    });
    const orderHistoryStyles=classNames({
        'sidebar-dt-active':route==='/my/order' || route==='/my/cancelation' || route==='/my/return',
    });

  return (
    <div className='account-imformation-container'>
        <div className='account-imformation-roadmap-wrapper'>
            <div className='account-imformation-roadmap'>
            <Link to='/' className='link-under-roadmap'><span>Home</span></Link>
            <span>/</span>
            <Link to={`${route}`}  className='link-under-roadmap'><span>{pageName}</span></Link>
            </div>
            <div>
              Welcome! <span className='login-account-name'>{loggedInUserName}</span>
            </div>
        </div>
        <div className='account-imformation-main-container'>
        <div className='account-imformation-sidebar-container'>
            <dl className='account-imformation-sidebar-wrapper'>
                <dt className={manageMyAccStyles}>Manage My Account</dt>
                <dd className={subProfileChildStyles} name='profile' onClick={() => handleClick('profile')}>My Profile</dd>
                <dd className={subAddressChildStyles} name='address' onClick={() => handleClick('address')}>Address Book {addressCount !==0 && `(${addressCount})`}</dd>
                <dd className={subPaymentChildStyles} name='payment' onClick={() => handleClick('payment')}>My Payment Options</dd>
            </dl>
            <dl className='account-imformation-sidebar-wrapper'>
                <dt className={orderHistoryStyles}> My Orders History</dt>
                <dd className={subOrderChildStyles} name='order' onClick={() => handleClick('order')}>My Orders</dd>
                <dd className={subReturnChildStyles} name='return' onClick={() => handleClick('return')}>My Returns</dd>
                <dd className={subCancelationChildStyles} name='cancelation' onClick={() => handleClick('cancelation')}>My Cancelations</dd>
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