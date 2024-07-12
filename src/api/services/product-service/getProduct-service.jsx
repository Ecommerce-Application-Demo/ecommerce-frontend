import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";
import QueryString from "qs";
import { filterEmptyArraysFromObject } from "../../utilities/helper";

const getAllProductService = async (masterCategory) => {
    const response = await axiosInstanceProduct.get(`/get/product`);

    return  response.data;
};

const getAllStylesOfProductService = async (productId) => {
    const response = await axiosInstanceProduct.get(`/get/product/style?productId=${productId}`);

    return  response.data;
};

const getAllSizesOfStyleService = async (styleId) => {
    const response = await axiosInstanceProduct.get(`/get/search/style/sizes?styleId=${styleId}`);

    return  response.data;
};

const getAllWarehouseService = async () => {
    const response = await axiosInstanceProduct.get(`/get/warehouse`);

    return  response.data;
};

//get searched product for profuct listing
const getSearchedProducts = async (searchingData) => {
    const { searchQuery, sortBy, selectedFilters } = searchingData;
    console.log(searchingData, 'service');
    const response = await axiosInstanceProduct.get(`/get/search/product/listing/${searchQuery}`, {
      params: {
        productsPerPage: 6,
        pageNumber: 1,
        sortBy: sortBy,
        ...selectedFilters,
      },
    });
    return response.data;
  };

//get searched product for profuct listing infinity search
const getInfinitySearchedProducts = async (searchedData) => {
    const { query, pageNo, sortBy, selectedFilters } = searchedData;
    const response = await axiosInstanceProduct.get(`/get/search/product/listing/${query}`,
    {
        params:{
            productsPerPage: 6,
            pageNumber:pageNo,
            sortBy,
            ...selectedFilters,
        }
    }
    );

    return response.data;
}

//get searched product for profuct listing infinity search
const getSearchedProductFilter = async (searchFilter) => {
    const { 
        searchQuery,
        selectedFilters,
        // latestArrayContent,
    } = searchFilter;

    // const flattenedLatestArrayContent = {};
    // for (const key in latestArrayContent) {
    //     if (latestArrayContent.hasOwnProperty(key)) {
    //         flattenedLatestArrayContent[key] = latestArrayContent[key].join(',');
    //     }
    // }
    // const queryParams = {
    //     ...selectedFilters,
    //    ...flattenedLatestArrayContent,
    // };
    // console.log(queryParams, 'query');
    const response = await axiosInstanceProduct.get(`/get/search/product/filters/${searchQuery}`, 
        // { ...latestArrayContent},
        {
        params: {
            ...selectedFilters,
        }
    });

    return response.data;
};


const getProductMainService = {
    getAllProductService,
    getSearchedProducts,
    getInfinitySearchedProducts,
    getSearchedProductFilter,
    getAllStylesOfProductService,
    getAllSizesOfStyleService,
    getAllWarehouseService,
 }
 
 export default getProductMainService;