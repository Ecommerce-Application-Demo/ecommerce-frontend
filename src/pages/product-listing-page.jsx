import React, { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductListingCards from "../components/product-listing-page/product-listing-cards";
import LoadingScreen from "../small-components/Loading-screen";
import getProductThunk from "../api/asyncThunk/product-thunk/getProductThunk";
import LoadingComponent from "../small-components/loading-component";
import ProductListingBreadcrump from "../components/product-listing-page/product-listing-breadcrunp";
import ProductListingSortBy from "../components/product-listing-page/product-listing-sortBy";
import ProductListingFilter from "../components/product-listing-page/product-listing-filters";
import useBreakpoints from "../api/utilities/responsive";
import ProductListingLoadingPage from "./loadingPage/product-listing-loading-page";
import ProductListingCardLoading from "./loadingPage/productListingPage/prduct-listing-card-loading";
import ProductListingCardsLoading from "./loadingPage/productListingPage/product-listing-cards-loading";

const ProductListingPage = () => {
  //------------------redux states access----------------
  const searchedProductsData = useSelector((state) => state.getProducts.searchedProductsData);
  const showInfinityLoader = useSelector((state) => state.getProducts.searchedInfinityData.START);

  // --------------------hooks----------------------------
  const dispatch = useDispatch();
  const location = useLocation();
  const isFetching = useRef(false);
  const { isMobile } = useBreakpoints();
  const loader = useRef(null);

  //----------state declaration---------------------
  const [sortBy, setSortBy] = useState('popularity');

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const { getSearchedProductsThunk, getInfinitySearchedProductsThunk } = getProductThunk;

  const { searchedProducts, START } = searchedProductsData;
  const productList = searchedProducts?.productList || [];
  const hasNextPage = searchedProducts?.hasNextPage;
  const currentPage = searchedProducts?.currentPage || 1;
  const breadCrumpList = searchedProducts?.breadCrumbList;
  const totalProduct = searchedProducts?.totalProductCount;

  useEffect(() => {
    if (searchQuery && (!productList || productList.length === 0) && !isFetching.current) {
      isFetching.current = true;
      const dataForSerach = {
        searchQuery: searchQuery,
        sortBy: sortBy==='Price: Low to High' ? 'lowToHigh' : sortBy==='Price: High to Low' ?  'highTOLow': sortBy,
      };
      dispatch(getSearchedProductsThunk(dataForSerach)).finally(() => {
        isFetching.current = false;
      });
    }
  }, [dispatch, getSearchedProductsThunk, searchQuery, productList, sortBy]);

  const handleObserver = useCallback(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting && !isFetching.current && hasNextPage) {
        isFetching.current = true;
        const searchedData = {
          query: searchQuery,
          pageNo: currentPage + 1,
          sortBy: sortBy==='Price: Low to High' ? 'lowToHigh' : sortBy==='Price: High to Low' ?  'highTOLow': sortBy,
        };
        dispatch(getInfinitySearchedProductsThunk(searchedData)).finally(() => {
          isFetching.current = false;
        });
      }
    },
    [
      dispatch,
      getInfinitySearchedProductsThunk,
      searchQuery,
      hasNextPage,
      currentPage,
    ]
  );
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  return (
    <div className="global-margin">
      <div className="product-listing-container">
        {!isMobile && (
          <div className="product-listing-breadcrump-container">
            <div className="product-listing-breadcrump-wrapper">
              <ProductListingBreadcrump 
                breadCrumpList = { breadCrumpList }
                loading = { START }
                totalProduct = { totalProduct }
              />
              <ProductListingSortBy 
                dispatch = { dispatch }
                loading = { START }
                sortBy = { sortBy }
                setSortBy = { setSortBy }
              />
            </div>
            <div className="divider--horizontal" />
          </div>
        )}
        <div className="product-listing-content-section">
          {!isMobile ? 
            <>
              <ProductListingFilter />
              <div className="divider--verticle" />
            </>
           : null}
          <div className="product-listing-cards-container">
            {START ? 
              <ProductListingCardsLoading />
             : 
              <ProductListingCards products={productList} />
            }
          </div>
        </div>
        {showInfinityLoader && <LoadingComponent size="50px" />}
        <div ref={loader} />
      </div>
    </div>
  );
};

export default ProductListingPage;
