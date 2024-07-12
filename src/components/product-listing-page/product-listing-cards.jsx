import React from 'react'
import ProductLisitngSingleCard from './product-listing-singleCard';
import ProductListingNewCard from './product-listing-new-card';
import NoProductFoundPage from './noProductFoundPage';

const ProductListingCards = (props) => {
  const {
    products,
    isMobile,
    isSmallMobile,
  } = props;

  return (
    <div className='product-listing-cards-container'>
      {products?.length > 0 ?
      <div className='product-listing-cards-wrapper'>
       {products?.map((product)=>{
        return <ProductListingNewCard product = { product } isMobile={ isMobile } isSmallMobile={isSmallMobile}/>;
       })}
      </div> :
      <NoProductFoundPage />}
    </div>
  )
}

export default ProductListingCards;