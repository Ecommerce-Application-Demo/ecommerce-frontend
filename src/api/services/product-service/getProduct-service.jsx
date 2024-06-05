import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";


const getAllProductService = async (masterCategory) => {
    const response = await axiosInstanceProduct.get(`/get/product`);

    return  response.data;
}

const getSearchedProducts = async (searchString) => {
    const response = await axiosInstanceProduct.get(`/get/search/product/listing/${searchString}`,
    {
        params:{
            productsPerPage: 6,
            pageNumber:1,
            sortBy: 'popularity',
        }
    }
    );

    return response.data;
}

const getInfinitySearchedProducts = async (searchedData) => {
    const { query, pageNo } = searchedData;
    console.log(searchedData);
    const response = await axiosInstanceProduct.get(`/get/search/product/listing/${query}`,
    {
        params:{
            productsPerPage: 6,
            pageNumber:pageNo,
            sortBy: 'popularity',
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