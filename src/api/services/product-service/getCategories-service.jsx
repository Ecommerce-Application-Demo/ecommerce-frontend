import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";


const getMasterCategory = async (masterCategory) => {
    const response = await axiosInstanceProduct.get(`/get/master-category`,
    masterCategory
    );
    return  response.data;
}

const getCategory = async (category) => {
    const response = await axiosInstanceProduct.get(`/get/category`,
    category
    );
    return  response.data;
}

const getCategoriesProduct = {
   getMasterCategory,
   getCategory,
}

export default getCategoriesProduct;