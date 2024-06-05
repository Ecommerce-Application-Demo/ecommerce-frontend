import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import ProductListingCards from '../components/product-listing-page/product-listing-cards';
import LoadingScreen from '../small-components/Loading-screen';
import getProductThunk from '../api/asyncThunk/product-thunk/getProductThunk';
import LoadingComponent from '../small-components/loading-component';
import ProductListingBreadcrump from '../components/product-listing-page/product-listing-breadcrunp';
import ProductListingSortBy from '../components/product-listing-page/product-listing-sortBy';
import ProductListingFilter from '../components/product-listing-page/product-listing-filters';
import useBreakpoints from '../api/utilities/responsive';

const ProductListingPage = () => {
  const searchedProductsData = useSelector((state) => state.getProducts.searchedProductsData);
  const showInfinityLoader = useSelector((state) => state.getProducts.searchedInfinityData.START);

  const dispatch = useDispatch();
  const location = useLocation();
  const isFetching = useRef(false);
  const { isMobile } = useBreakpoints();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const { getSearchedProductsThunk, getInfinitySearchedProductsThunk } = getProductThunk;
  const { searchedProducts, START } = searchedProductsData;
  const productList = searchedProducts?.productList || [];
  const hasNextPage = searchedProducts?.hasNextPage;
  const currentPage = searchedProducts?.currentPage || 1;

  useEffect(() => {
    if ((searchQuery && (!productList || productList.length === 0)) && !isFetching.current) {
      isFetching.current = true;
      dispatch(getSearchedProductsThunk(searchQuery)).finally(() => {
        isFetching.current = false;
      });
    }
  }, [dispatch, getSearchedProductsThunk, searchQuery, productList]);

  const handleInfinityScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    if (windowHeight + scrollTop >= scrollHeight - 50 && !isFetching.current && hasNextPage) {
      isFetching.current = true;
      const searchedData = {
        query: searchQuery,
        pageNo: currentPage + 1,
      };
      dispatch(getInfinitySearchedProductsThunk(searchedData)).finally(() => {
        isFetching.current = false;
      });
    }
  }, [dispatch, getInfinitySearchedProductsThunk, searchQuery, hasNextPage, currentPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleInfinityScroll);
    return () => {
      window.removeEventListener('scroll', handleInfinityScroll);
    };
  }, [handleInfinityScroll]);

  return (
    <div className="global-margin">
      {START ? (
        <LoadingScreen />
      ) : (
        <>
          {!isMobile && 
          <div className="product-listing-breadcrump-container">
            <div className="product-listing-breadcrump-wrapper">
            <ProductListingBreadcrump />
            <ProductListingSortBy />
            </div>
          <div className="divider--horizontal" />
          </div>}
        <div className="product-listing-container">
          <div className="product-listing-content-section">
            {!isMobile ? (
              <>
                <ProductListingFilter />
                <div className="divider--verticle" />
              </>
            ) : (
              null
            )}
            <ProductListingCards products={productList} />
          </div>
          {showInfinityLoader && <LoadingComponent size="50px" />}
        </div>
        </>
      )}
    </div>
  );
};

export default ProductListingPage;
