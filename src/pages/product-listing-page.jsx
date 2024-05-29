import React from 'react'
import ProductListingBreadcrump from '../components/product-listing-page/product-listing-breadcrunp';
import ProductListingSortBy from '../components/product-listing-page/product-listing-sortBy';
import ProductListingFilter from '../components/product-listing-page/product-listing-filters';
import ProductListingCards from '../components/product-listing-page/product-listing-cards';

const ProductListingPage = () => {
  return (
    <div className='global-margin '>
      <div className='product-listing-container'>
      {/* <div className="product-listing-breadcrump-container">
        <ProductListingBreadcrump />
        <ProductListingSortBy />
      </div> */}
      <div className='product-listing-content-section'>
        {/* <ProductListingFilter /> */}
        <ProductListingCards />
      </div>
      </div>
    </div>
  )
}

export default ProductListingPage;