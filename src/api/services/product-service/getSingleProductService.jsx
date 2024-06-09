import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";


//get all types data for single product
const getSingleProductWithProductIdService = async (searchingData) => {
    const { searchQuery, sortBy } = searchingData;
     const response = await axiosInstanceProduct.get(`/get/product`,
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

 //get perticular stryleID of product
const getProductWithStyleIdServivce = async (styleData) => {
    const { productId, styleId } = styleData;
     const response = await axiosInstanceProduct.get(`/get/product/style`,
     {
         params:{
             productId,
             styleId,
         }
     }
     );
 
     return response.data;
 }

 const SINGLEPRODUCTSERVICE = {
    getSingleProductWithProductIdService,
    getProductWithStyleIdServivce,
 };

 export default SINGLEPRODUCTSERVICE;