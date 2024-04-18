import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";


const addMasterCategory = async (masterCategory) => {
    const response = await axiosInstanceProduct.post(`/add/master-category`,
    masterCategory
    );
    return  response.data;
}
const addCategory = async (category) => {
    const response = await axiosInstanceProduct.post(`/add/category`,
    category
    );
    return  response.data;
}
const addSubCategory = async (subCategory) => {
    const response = await axiosInstanceProduct.post(`/add/sub-category`,
    subCategory
    );
    return  response.data;
}

const addBrand = async (brand) => {
    const response = await axiosInstanceProduct.post(`/add/brand`,
    brand
    );
    return  response.data;
}

const addCategoriesProduct = {
   addMasterCategory,
   addCategory,
   addSubCategory,
   addBrand,
}

export default addCategoriesProduct;