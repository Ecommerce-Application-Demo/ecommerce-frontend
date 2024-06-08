import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";


const getAllProductService = async (masterCategory) => {
    const response = await axiosInstanceProduct.get(`/get/product`);

    return  response.data;
}
//get searched product for profuct listing
const getSearchedProducts = async (searchingData) => {
   const { searchQuery, sortBy } = searchingData;
    const response = await axiosInstanceProduct.get(`/get/search/product/listing/${searchQuery}`,
    {
        params:{
            productsPerPage: 6,
            pageNumber:1,
            sortBy: sortBy,
        }
    }
    );

    return response.data;
}

//get searched product for profuct listing infinity search
const getInfinitySearchedProducts = async (searchedData) => {
    const { query, pageNo, sortBy } = searchedData;
    const response = await axiosInstanceProduct.get(`/get/search/product/listing/${query}`,
    {
        params:{
            productsPerPage: 6,
            pageNumber:pageNo,
            sortBy,
        }
    }
    );

    return response.data;
}

//get searched product for profuct listing infinity search
const getSearchedProductFilter = async (searchString) => {
    // const { query, pageNo, sortBy } = searchedData;
    const response = await axiosInstanceProduct.get(`/get/search/product/filters/${searchString}`);

    return response.data;
}

const getProductMainService = {
    getAllProductService,
    getSearchedProducts,
    getInfinitySearchedProducts,
    getSearchedProductFilter,
 }
 
 export default getProductMainService;