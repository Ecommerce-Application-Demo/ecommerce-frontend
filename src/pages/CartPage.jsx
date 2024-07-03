import React from 'react'
import AddressSection from '../components/cart/Address-section';
import CartSection from '../components/cart/cart-section';
import MoveToWishlist from '../components/cart/moveToWishlist-section';
import PriceSection from '../components/cart/price-section';

const CartPage = () => {
  return (
    <div className='cartpage-main-container'>
      <div className='cartpage-leftsection'>
        <AddressSection />
        <CartSection />
        <MoveToWishlist />
      </div>
      <div className='cartpage-rightsection'>
        <PriceSection />
      </div>
    </div>
  )
}

export default CartPage;
