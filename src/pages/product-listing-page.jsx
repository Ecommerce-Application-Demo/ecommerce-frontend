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
import { filterEmptyArraysFromObject, getSelectedFilters } from "../api/utilities/helper";

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
  const { isMobile, isSmallMobile } = useBreakpoints();
  const loader = useRef(null);

  //----------state declaration---------------------
  const [sortBy, setSortBy] = useState('popularity');
  const [previousSearchQuery, setPreviousSearchQuery] = useState('');
  const [previousFilter, setPreviousFilter] = useState('');
  // State to hold selected items
  const [selectedItems, setSelectedItems] = useState({
    masterCategories: [],
    categories: [],
    brands: [],
    colours: [],
    sizes: [],
    discountPercentages: [],
  });
  const [priceRange, setPriceRange] = useState({
    minPrice: '',
    maxPrice: '',
  });
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
  const anyfilter = Object.values(selectedItems).some(item =>
    Array.isArray(item) ? item.length > 0 : item !== ''
  );  const selectedFilters = getSelectedFilters(selectedItems);

//   useEffect(() => {
//     if (searchQuery !== previousSearchQuery) {
//       isProductsFetching.current = false;
//       isFilterFetching.current = false;
//       setPreviousSearchQuery(searchQuery);
//     }

//     if (searchQuery && (!productList || productList.length === 0) && !isProductsFetching.current && !anyfilter) {
//       isProductsFetching.current = true;
//       const dataForSerach = {
//         searchQuery: searchQuery,
//         sortBy: sortBy === 'Price: Low to High' ? 'lowToHigh' : sortBy === 'Price: High to Low' ? 'highTOLow' : sortBy,
//       };

//       dispatch(getSearchedProductsThunk(dataForSerach)).unwrap().then((res) => {
//         if (res?.productList) {
//           isProductsFetching.current = false;
//         }
//       });
//     }
//   }, [dispatch, getSearchedProductsThunk, searchQuery, productList, sortBy, previousSearchQuery]);
// useEffect(()=> {
//   if (selectedFilters !== previousFilter) {
//     setPreviousFilter(selectedFilters);
//   }
// }, [selectedFilters]);
//   useEffect(() => {
//     if (searchQuery && (!productList || productList.length === 0) && !isFilterFetching.current && !anyfilter) {
//       isFilterFetching.current = true;
//       const data = {
//         searchQuery
//       };
//       dispatch(getSearchedProductFilterThunk(data)).unwrap().then((res) => {
//           isProductsFetching.current = false;
//       });
//     }
//   }, [dispatch, getSearchedProductsThunk, searchQuery, productList, previousSearchQuery]);

  const handleObserver = useCallback(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting && !isProductsFetching.current && hasNextPage) {
        isProductsFetching.current = true;
        const searchedData = {
          query: searchQuery,
          pageNo: currentPage + 1,
          sortBy: sortBy === 'Price: Low to High' ? 'lowToHigh' : sortBy === 'Price: High to Low' ? 'highTOLow' : sortBy,
          selectedFilters,
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
  
  useEffect(() => {
    if (anyfilter) {
      dispatch(getSearchedProductFilterThunk({
        searchQuery,
        selectedFilters,
      }));
      dispatch(getSearchedProductsThunk({
        searchQuery,
        sortBy: sortBy === 'Price: Low to High' ? 'lowToHigh' : sortBy === 'Price: High to Low' ? 'highTOLow' : sortBy,
        selectedFilters,
      }));
    } else {
      dispatch(getSearchedProductsThunk({
        searchQuery,
        sortBy: sortBy === 'Price: Low to High' ? 'lowToHigh' : sortBy === 'Price: High to Low' ? 'highTOLow' : sortBy,
        selectedFilters: {}, 
      }));

      dispatch(getSearchedProductFilterThunk({
        searchQuery,
        selectedFilters,
      }));
    }
  }, [selectedItems, anyfilter, dispatch, getSearchedProductFilterThunk, getSearchedProductsThunk, searchQuery, sortBy]);
  

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
                selectedItems={ selectedItems }
                setSelectedItems={ setSelectedItems }
                priceRange={ priceRange }
                setPriceRange={ setPriceRange }
              />
            </div>
            </>
            : null}
            {!isMobile &&<div className="divider--verticle" />}
          <div className="product-listing-cards-container">
            {START ?
              <ProductListingCardsLoading />
              :
              <ProductListingCards 
              products={ productList } 
              isMobile={ isMobile }
              isSmallMobile= { isSmallMobile }
              />
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
