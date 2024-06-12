import React from 'react'
import ProductImage from '../components/single-product/productImage';
import SingleProductDetails from '../components/single-product/single-product-details';
import useBreakpoints from '../api/utilities/responsive';
import ProductImagePhone from '../components/single-product/productImage-phone';
import singleProductThunk from '../api/asyncThunk/product-thunk/singleProductThunk';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SingleProductPage = () => {
  //redux states--------------
  const productStyle = useSelector((state)=> state.product.productWithStyleidData);

  const { isMobile } = useBreakpoints();
  const { styleName, styleId } = useParams();
  const dispatch = useDispatch();

  const { getProductWithStyleId } = singleProductThunk;
  const { productWithStyleId, START, FAIL } = productStyle;
  const productImages = productWithStyleId?.images;

  useEffect(()=> {
    const dataToDispatch = {
      styleName: styleName.toLowerCase(),
      styleId,
    }
    dispatch(getProductWithStyleId(dataToDispatch));
  },[]);

  return (
    <div className='global-margin'>
        <div className="single-product-container">
            {isMobile ? <ProductImagePhone/> : <ProductImage productImages = { productImages }/>}
            <SingleProductDetails 
              dispatch={ dispatch }
              isMobile={ isMobile }
              productDetails={ productWithStyleId }
            />
        </div>
    </div>
  )
}

export default SingleProductPage;