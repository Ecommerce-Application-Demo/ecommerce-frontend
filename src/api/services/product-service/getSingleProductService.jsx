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
    const { styleName, styleId } = styleData;
     const response = await axiosInstanceProduct.get(`/get/search/product/${styleName}/${styleId}`,
     );
 
     return response.data;
 }

  //get particular stryleID of product
const getProductMoreColorsService = async (styleId) => {
     const response = await axiosInstanceProduct.get(`/get/search/product/colours`,
        {
            params:{
                styleId,
            }
        }
     );
 
     return response.data;
 }
  //get particular stryleID of product
  const checkDeliveryService = async (deliveryDetails) => {
    const {pincode, skuId} = deliveryDetails;
    const response = await axiosInstanceProduct.get(`/helper/isDeliverable`,
       {
           params:{
               pincode,
               skuId,
           }
       }
    );
    return response?.data;
}
 const SINGLEPRODUCTSERVICE = {
    getSingleProductWithProductIdService,
    getProductWithStyleIdServivce,
    getProductMoreColorsService,
    checkDeliveryService,
 };

 export default SINGLEPRODUCTSERVICE;