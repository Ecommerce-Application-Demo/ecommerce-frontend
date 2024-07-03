import React from 'react'
import StickyBox from 'react-sticky-box';

const PriceSection = () => {
  return (
      <StickyBox offsetTop={180} offsetBottom={100}>
    <div className='price-details-container'>
      <p>PRICE DETAILS (2 ITEMS)</p>
      <div className='divider--horizontal' />
      <div className='priceBreakage-container'>
        <div>
          <p>Total MRP</p>
          <p>Rs.9544</p>
        </div>
        <div>
          <p>Discount on MRP</p>
          <p className='green-text'>-Rs.9544</p>
        </div>
        <div className='green-text'>
          <p>Sheeping Fee</p>
          <p>FREE</p>
        </div>
        <div className='divider--horizontal' />
        <div className='totalAmount-wrapper'>
          <p>Total Amount</p>
          <p>Rs. 9544</p>
        </div>
      </div>
        <div className='place-order-btn'>
          PLACE ORDER
        </div>
    </div>
      </StickyBox>
  )
}

export default PriceSection;
