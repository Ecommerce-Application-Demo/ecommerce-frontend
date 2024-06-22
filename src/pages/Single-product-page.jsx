import React from 'react'
import ProductImage from '../components/single-product/productImage';
import SingleProductDetails from '../components/single-product/single-product-details';
import useBreakpoints from '../api/utilities/responsive';
import ProductImagePhone from '../components/single-product/productImage-phone';
import singleProductThunk from '../api/asyncThunk/product-thunk/singleProductThunk';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoProductFoundPage from '../components/product-listing-page/noProductFoundPage';

const SingleProductPage = () => {
  //redux states--------------
  const productStyle = useSelector((state) => state.product.productWithStyleidData);
  const { isLoggedIn } = useSelector((state) => state.user);
  const isDeliverableData = useSelector((state) => state.product.isDeliverableData);
  const addressForDeliveryOption = useSelector((state) => state.product.addressForDeliveryOption);

//hook calls-------------------
  const { isMobile } = useBreakpoints();
  const { styleName, styleId } = useParams();
  const dispatch = useDispatch();

  const { getProductWithStyleId, getProductMoreColors } = singleProductThunk;
  const { productWithStyleId, START,SUCCESS, FAIL } = productStyle;
  const productImages = productWithStyleId?.images;
  const isDeliverable = isDeliverableData?.isDeliverable;
  useEffect(() => {
    const dataToDispatch = {
      styleName: styleName.toLowerCase(),
      styleId,
    }
    dispatch(getProductWithStyleId(dataToDispatch));
    dispatch(getProductMoreColors(styleId));
  }, []);

  return (
    <div className={!isMobile ? 'global-margin' : 'global-margin-singleProduct'}>
      {!FAIL ?
      <div className="single-product-container">
        {isMobile ? <ProductImagePhone productImages={ productImages }/> : <ProductImage productImages={ productImages } />}
        <SingleProductDetails
          addressForDeliveryOption={ addressForDeliveryOption }
          dispatch={ dispatch }
          isDeliverable={ isDeliverable }
          isLoggedIn={ isLoggedIn }
          isMobile={ isMobile }
          productDetails={ productWithStyleId }
          styleId={ styleId }
        />
      </div> : 
      <NoProductFoundPage />
    }
    </div>
  )
}

export default SingleProductPage;