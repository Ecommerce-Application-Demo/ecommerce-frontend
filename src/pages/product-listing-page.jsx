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
import ScrollToTopButton from "../small-components/scrollToTop";
import { resetSearchedProduct } from "../redux/Slices/product/productSlice";
import NoProductFoundPage from "../components/product-listing-page/noProductFoundPage";

const ProductListingPage = () => {
  //------------------redux states access----------------
  const searchedProductsData = useSelector((state) => state.getProducts.searchedProductsData);
  const showInfinityLoader = useSelector((state) => state.getProducts.searchedInfinityData.START);
  const searchproductsFilter = useSelector((state) => state.getProducts.searchProductsFilterData);

  // --------------------hooks----------------------------
  const dispatch = useDispatch();
  const location = useLocation();
  const isProductsFetching = useRef(false);
  const isFilterFetching = useRef(false);
  const { isMobile } = useBreakpoints();
  const loader = useRef(null);

  //----------state declaration---------------------
  const [sortBy, setSortBy] = useState('popularity');
  const [previousSearchQuery, setPreviousSearchQuery] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const { getSearchedProductsThunk, getInfinitySearchedProductsThunk, getSearchedProductFilterThunk } = getProductThunk;

  const { searchedProducts, START } = searchedProductsData;
  const productList = searchedProducts?.productList;
  const hasNextPage = searchedProducts?.hasNextPage;
  const currentPage = searchedProducts?.currentPage || 1;
  const breadCrumpList = searchedProducts?.breadCrumbList;
  const totalProduct = searchedProducts?.totalProductCount || 0;
  const filterLoading = searchproductsFilter?.START;
  const productsFilter = searchproductsFilter?.searchProductsFilter;

  useEffect(() => {
    if (searchQuery !== previousSearchQuery) {
      isProductsFetching.current = false;
      isFilterFetching.current = false;
      setPreviousSearchQuery(searchQuery);
    }

    if (searchQuery && (!productList || productList.length === 0) && !isProductsFetching.current) {
      isProductsFetching.current = true;
      const dataForSerach = {
        searchQuery: searchQuery,
        sortBy: sortBy === 'Price: Low to High' ? 'lowToHigh' : sortBy === 'Price: High to Low' ? 'highTOLow' : sortBy,
      };

      dispatch(getSearchedProductsThunk(dataForSerach)).unwrap().then((res) => {
        if (res?.productList) {
          isProductsFetching.current = false;
        }
      });
    }
  }, [dispatch, getSearchedProductsThunk, searchQuery, productList, sortBy, previousSearchQuery]);

  useEffect(() => {
    if (searchQuery && (!productList || productList.length === 0) && !isFilterFetching.current) {
      isFilterFetching.current = true;
      dispatch(getSearchedProductFilterThunk(searchQuery)).unwrap().then((res) => {
          isProductsFetching.current = false;
      });
    }
  }, [dispatch, getSearchedProductsThunk, searchQuery, productList, previousSearchQuery]);

  const handleObserver = useCallback(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting && !isProductsFetching.current && hasNextPage) {
        isProductsFetching.current = true;
        const searchedData = {
          query: searchQuery,
          pageNo: currentPage + 1,
          sortBy: sortBy === 'Price: Low to High' ? 'lowToHigh' : sortBy === 'Price: High to Low' ? 'highTOLow' : sortBy,
        };
        dispatch(getInfinitySearchedProductsThunk(searchedData)).finally(() => {
          isProductsFetching.current = false;
        });
      }
    },
    [
      dispatch,
      getInfinitySearchedProductsThunk,
      searchQuery,
      hasNextPage,
      currentPage,
      sortBy
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
  console.log(productList);
  return (
    <div className="global-margin">
      <ScrollToTopButton />
      { !START && (!productList || totalProduct===0) ? 
      <NoProductFoundPage /> 
      :
      <div className="product-listing-container">
        {!isMobile && (
          <div className="product-listing-breadcrump-container">
            <div className="product-listing-breadcrump-wrapper">
              <ProductListingBreadcrump
                breadCrumpList={breadCrumpList}
                loading={START}
                totalProduct={totalProduct}
              />
              <ProductListingSortBy
                dispatch={dispatch}
                loading={START}
                setSortBy={setSortBy}
                sortBy={sortBy}
              />
            </div>
            <div className="divider--horizontal" />
          </div>
        )}
        <div className="product-listing-content-section">
          {!isMobile ?
            <>
            <div className="product-filter-main-container">
              <ProductListingFilter
                filterLoading={filterLoading}
                productsFilter={productsFilter}
              />
            </div>
            </>
            : null}
            <div className="divider--verticle" />
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
      </div>}
      {((isMobile &&  !(!productList || totalProduct===0)) && 
        <div className="mobile-filter-container">
          <ProductListingFilter />
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
