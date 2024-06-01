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
       {/* <ProductListingNewCard color='rgb(5, 196, 5)' />
       <ProductListingNewCard color='#0000' />
       <ProductListingNewCard color='#8007af' /> */}
       {products?.map((product)=>{
        return <ProductListingNewCard product = { product } />;
       })};

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