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
    console.log(category);
    const response = await axiosInstanceProduct.get(`/get/category`,{
    params: {
        masterCategoryName: category?.masterCategoryName || null,
        CategoryName: category?.categoryName || null,
    }
    }
    );
    return  response.data;
}

const getCategoriesProduct = {
   getMasterCategory,
   getCategory,
}

export default getCategoriesProduct;