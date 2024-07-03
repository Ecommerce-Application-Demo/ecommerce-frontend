import React from 'react'
import { DesiCartIconForLoading } from '../../../assets/icons'

const ProductListingCardLoading = () => {
  return (
    <div className='product-listing-loading-card-container'>
      <div className='product-listing-loading-card-image'>
        <DesiCartIconForLoading size='80px'/>
      </div>
        <div className="product-listing-card-content-loading">
            <div className='loading-brandName'></div>
            <div className='loading-productName'></div>
            <div className='loading-price'>
                <div />
                <div />
                <div />
            </div>
      </div>
    </div>
  )
}

export default ProductListingCardLoading
