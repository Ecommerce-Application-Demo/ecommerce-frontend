import React from 'react'
import ProductLisitngSingleCard from './product-listing-singleCard';
import ProductListingNewCard from './product-listing-new-card';

const ProductListingCards = () => {
  return (
    <div className='product-listing-cards-container'>
      <div className='product-listing-cards-wrapper'>
       <ProductListingNewCard color='rgb(5, 196, 5)' />
       <ProductListingNewCard color='#ee1717' />
       <ProductListingNewCard color='#000' />

       {/* <ProductListingNewCard color='#DB4444' />
       <ProductListingNewCard color='#DB4444' />
       <ProductListingNewCard color='#DB4444' />
       <ProductListingNewCard color='#DB4444' />
       <ProductLisitngSingleCard color={'red'}/>
       <ProductLisitngSingleCard color={'blue'}/>
       <ProductLisitngSingleCard color={'green'}/>
       <ProductLisitngSingleCard color={'violet'}/>
       <ProductLisitngSingleCard color={'black'}/>
       <ProductLisitngSingleCard color={'white'}/> */}

      </div>
    </div>
  )
}

export default ProductListingCards;