import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";


const getAllProductService = async (masterCategory) => {
    const response = await axiosInstanceProduct.get(`/get/product`);

    return  response.data;
}

const getProductMainService = {
    getAllProductService,
 }
 
 export default getProductMainService;