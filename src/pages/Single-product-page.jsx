import React from 'react'
import ProductImage from '../components/single-product/productImage';
import SingleProductDetails from '../components/single-product/single-product-details';

const SingleProductPage = () => {
  return (
        <div className="global-margin single-product-container">
            <ProductImage/>
            <SingleProductDetails/>
        </div>
  )
}

export default SingleProductPage;