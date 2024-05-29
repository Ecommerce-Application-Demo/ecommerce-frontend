import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";


const getAllProductService = async (masterCategory) => {
    const response = await axiosInstanceProduct.get(`/get/product`);

    return  response.data;
}

const getSearchedProducts = async () => {
    const response = await axiosInstanceProduct.get();

    return response.data;
}
const getProductMainService = {
    getAllProductService,
    getSearchedProducts,
 }
 
 export default getProductMainService;