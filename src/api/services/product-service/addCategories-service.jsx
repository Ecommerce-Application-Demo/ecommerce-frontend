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

const addProduct = async (product) => {
    const response = await axiosInstanceProduct.post(`/add/product`,
    product
    );
    return  response.data;
};

const addProductSkuService = async (productSku) => {
    const response = await axiosInstanceProduct.post(`/add/product/sku`,
    productSku
    );
    return  response.data;
};

const addStyleInventoryService = async (inventoryData) => {
    const response = await axiosInstanceProduct.post(`/add/product/inventory`,
    inventoryData
    );
    return  response.data;
};

const addCategoriesProduct = {
   addMasterCategory,
   addCategory,
   addSubCategory,
   addBrand,
   addProduct,
   addProductSkuService,
   addStyleInventoryService,
}

export default addCategoriesProduct;