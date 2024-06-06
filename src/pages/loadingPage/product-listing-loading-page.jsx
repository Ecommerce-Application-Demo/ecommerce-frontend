import React from 'react';
import useBreakpoints from '../../api/utilities/responsive';
import ProductListingCardLoading from './productListingPage/prduct-listing-card-loading';

const ProductListingLoadingPage = () => {
  const {isMobile} = useBreakpoints();
  return (
    <div className="global-margin">
          {/* {!isMobile && (
            <div className="product-listing-breadcrump-container">
              <div className="product-listing-breadcrump-wrapper">
              </div>
              <div className="divider--horizontal" />
            </div>
          )} */}
          <div className="product-listing-loading-container">
            <div className="product-listing-loadingcontent-section">
              {!isMobile ? (
                <>
                  <div className="divider--verticle" />
                  <div className='product-listing-loading-cards-wrapper'>
                    <ProductListingCardLoading />
                  </div>
                </>
              ) : null}
            </div>
          </div>
    </div>
  );
};

export default ProductListingLoadingPage;
