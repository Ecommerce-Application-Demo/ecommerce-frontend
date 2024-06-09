import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CartPage from '../pages/CartPage';
import { useLocation } from 'react-router';
import PaymentPage from '../pages/Payment-page';
import { DesiCartIconForLoading, Wishlist } from '../assets/icons';
import classNames from 'classnames';
import ThemeToggle from '../small-components/ThemeToggle';

const OrderSection = () => {
    const dispatch = useDispatch();
    const routeParams = useLocation().pathname;
    const cartParams = routeParams === '/checkout/cart';
    const paymentParams = routeParams === '/checkout/payment';
    console.log(cartParams);
  return (
    <div className='orderSection-main-container'>
      <div className='ordersectionNavbar'>
        <div><DesiCartIconForLoading size='40px'/></div>
        <div className='orderSection-nav-mid'>
          <span className={`${cartParams ? 'selected' : 'notSelected'}`}>BAG</span>
          <span>-----------</span>
          <span className={`${paymentParams ? 'selected' : ''}`}>PAYMENT</span>
        </div>
        <div className='orderSection-nav-right'>
          <ThemeToggle />
        </div>
      </div>
      {routeParams === '/checkout/cart' ? <CartPage /> : <PaymentPage />}
    </div>
  )
}

export default OrderSection;
