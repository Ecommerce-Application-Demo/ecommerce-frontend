import axiosInstanceProduct from "../../utilities/axiosInstanceProduct";


const getMasterCategory = async (masterCategory) => {
    const response = await axiosInstanceProduct.get(`/get/master-category`, {
        params: {
            masterCategoryName: masterCategory?.masterCategoryName || null,
        }
    })

    return  response.data;
}

const getCategory = async (category) => {
    const response = await axiosInstanceProduct.get(`/get/category`,{
    params: {
        masterCategoryName: category?.masterCategoryName || null,
        CategoryName: category?.categoryName || null,
    }
    }
    );
    return  response.data;
};

const getSubCategory = async (subCategory) => {
    const response = await axiosInstanceProduct.get(`/get/sub-category`,{
    params: {
        subCategoryName: subCategory?.subCategoryName || null,
        categoryName: subCategory?.categoryName || null,
    }
    }
    );
    return  response.data;
}

const getBrand = async () => {
    const response = await axiosInstanceProduct.get(`/get/brand`,{
    }
    );
    return  response.data;
}

const getCategoriesProduct = {
   getMasterCategory,
   getCategory,
   getSubCategory,
   getBrand,
}

export default getCategoriesProduct;