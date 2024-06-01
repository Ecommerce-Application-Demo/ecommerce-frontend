import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import ProductListingCards from '../components/product-listing-page/product-listing-cards';
import LoadingScreen from '../small-components/Loading-screen';
import getProductThunk from '../api/asyncThunk/product-thunk/getProductThunk';
import LoadingComponent from '../small-components/loading-component';

const ProductListingPage = () => {
  const searchedProductsData = useSelector((state) => state.getProducts.searchedProductsData);
  const showInfinityLoader = useSelector((state) => state.getProducts.searchedInfinityData.START);

  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const { getSearchedProductsThunk, getInfinitySearchedProductsThunk } = getProductThunk;
  const { searchedProducts, START } = searchedProductsData;
  const productList = searchedProducts?.productList || [];
  
  const isFetching = useRef(false); // Use a ref to track the fetching status

  useEffect(() => {
    dispatch(getSearchedProductsThunk(searchQuery));
  }, [dispatch, getSearchedProductsThunk, searchQuery]);

  const handleInfinityScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    if (windowHeight + scrollTop >= scrollHeight - 50 && !isFetching.current) {
      isFetching.current = true;
      dispatch(getInfinitySearchedProductsThunk(searchQuery)).finally(() => {
        isFetching.current = false; 
      });
    }
  }, [dispatch, getInfinitySearchedProductsThunk, searchQuery]);

  useEffect(() => {
    window.addEventListener('scroll', handleInfinityScroll);
    return () => {
      window.removeEventListener('scroll', handleInfinityScroll);
    };
  }, [handleInfinityScroll]);

  return (
    <div className='global-margin'>
      {START ? (
        <LoadingScreen />
      ) : (
        <div className='product-listing-container'>
          <div className='product-listing-content-section'>
            <ProductListingCards products={productList} />
          </div>
      {showInfinityLoader && <LoadingComponent size='50px'/>}
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
