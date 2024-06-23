import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";
import QueryString from "qs";
import { filterEmptyArraysFromObject } from "../../utilities/helper";

const getAllProductService = async (masterCategory) => {
    const response = await axiosInstanceProduct.get(`/get/product`);

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
         } = searchFilter;

    const response = await axiosInstanceProduct.get(`/get/search/product/filters/${searchQuery}`,
        {
            params:{
             ...selectedFilters
            }
        }
    );

    return response.data;
}

const getProductMainService = {
    getAllProductService,
    getSearchedProducts,
    getInfinitySearchedProducts,
    getSearchedProductFilter,
 }
 
 export default getProductMainService;