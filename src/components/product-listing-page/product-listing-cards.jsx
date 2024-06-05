import React from 'react'
import ProductLisitngSingleCard from './product-listing-singleCard';
import ProductListingNewCard from './product-listing-new-card';

const ProductListingCards = (props) => {
  const {
    products
  } = props;

  return (
    <div className='product-listing-cards-container'>
      <div className='product-listing-cards-wrapper'>
       {products?.map((product)=>{
        return <ProductListingNewCard product = { product } />;
       })};
      </div>
    </div>
  )
}

export default ProductListingCards;