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
import ProductListingEditFilter from "../components/product-listing-page/product-listing-edit-filter";
import { motion } from "framer-motion";
import ProductListingMobileSortBy from "../components/product-listing-page/product-listing-mobile-sortBy";
import ProductListingMobileFilter from "../components/product-listing-page/product-listing-mobile-filter";

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
  const [sortBy, setSortBy] = useState('Popularity');
  const [previousSearchQuery, setPreviousSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openSortByModal, setOpenSortByModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    masterCategories: [],
    categories: [],
    brands: [],
    colours: [],
    sizes: [],
    discountPercentage: [],
  });
  const [priceRange, setPriceRange] = useState({
    minPrice: '',
    maxPrice: '',
  });
  const [latestChangingKey, setLatestChangingKey] = useState('');
  const [firstLoad, setFirstLoad] = useState(true); 
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
  ); 
  const isAnyArrayEmpty = () => {
    return Object.values(selectedItems).some((array) => array.length === 0);
  };

   const selectedFilters = getSelectedFilters(selectedItems);
   const handleClearAll = () => {
    const emptySelectedItems = Object.keys(selectedItems).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    setSelectedItems(emptySelectedItems);
  };

  useEffect(()=>{
    if (searchQuery !== previousSearchQuery) {
      handleClearAll();
    }
  },[searchQuery]);

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
    if ((anyfilter || !firstLoad) && productsFilter) {
      const latestArrayContent = { [latestChangingKey]: productsFilter[latestChangingKey]};
      dispatch(getSearchedProductFilterThunk({
        searchQuery,
        selectedFilters,
        latestArrayContent,
      }));
      dispatch(getSearchedProductsThunk({
        searchQuery,
        sortBy: sortBy === 'Price: Low to High' ? 'lowToHigh' : sortBy === 'Price: High to Low' ? 'highTOLow' : sortBy,
        selectedFilters,
      }));
    } else if (firstLoad) {
      dispatch(getSearchedProductsThunk({
        searchQuery,
        sortBy: sortBy === 'Price: Low to High' ? 'lowToHigh' : sortBy === 'Price: High to Low' ? 'highTOLow' : sortBy,
        selectedFilters: {}, 
      }));

      dispatch(getSearchedProductFilterThunk({
        searchQuery,
        selectedFilters,
      }));
      setFirstLoad(false);
    }
  }, [anyfilter, dispatch, searchQuery, sortBy, latestChangingKey, selectedItems, firstLoad]);
  
  useEffect(() => {
    let lastScrollTop = 0;
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop) {
        setShowFilter(false);
      } else {
        setShowFilter(true);
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowFilter(true);
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          </div>
        )}
         {!isMobile && (
          <ProductListingEditFilter 
          selectedItems={ selectedItems }
          setSelectedItems={ setSelectedItems }
          handleClearAll={ handleClearAll }
          />
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
                setLatestChangingKey={ setLatestChangingKey }
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
        <>
        <motion.div 
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: showFilter ? 0 : 60, opacity: showFilter ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="mobile-filter-container">
          <div onClick={()=>setOpenSortByModal(true)}>Sort By</div>
          <span className="divider--verticle" />
          <div onClick={()=>setOpenFilterModal(true)}>Filter</div>
        </motion.div>
          {openSortByModal && 
          <ProductListingMobileSortBy 
            setOpenSortByModal={ setOpenSortByModal }
            dispatch={dispatch}
            loading={START}
            setSortBy={setSortBy}
            sortBy={sortBy}

          />}
          {openFilterModal && 
          <ProductListingMobileFilter setOpenFilterModal={ setOpenFilterModal }/>}
        </>
      )}
    </div>
  );
};

export default ProductListingPage;
