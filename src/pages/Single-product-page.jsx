import React from 'react'
import ProductImage from '../components/single-product/productImage';
import SingleProductDetails from '../components/single-product/single-product-details';
import useBreakpoints from '../api/utilities/responsive';
import ProductImagePhone from '../components/single-product/productImage-phone';

const SingleProductPage = () => {
  const { isMobile } = useBreakpoints();
  return (
        <div className="global-margin single-product-container" style={{whiteSpace:'discard'}}>
            {!isMobile && <ProductImage/>}
            {isMobile && <ProductImagePhone/>}
            <SingleProductDetails/>
        </div>
  )
}

export default SingleProductPage;