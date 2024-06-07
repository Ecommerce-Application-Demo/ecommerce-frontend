import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";


const getAllProductService = async (masterCategory) => {
    const response = await axiosInstanceProduct.get(`/get/product`);

    return  response.data;
}

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

const getInfinitySearchedProducts = async (searchedData) => {
    const { query, pageNo, sortBy } = searchedData;
    console.log(searchedData);
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

const getProductMainService = {
    getAllProductService,
    getSearchedProducts,
    getInfinitySearchedProducts,
 }
 
 export default getProductMainService;