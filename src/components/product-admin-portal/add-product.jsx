import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getCategoriesProductThunk from "../../api/asyncThunk/product-thunk/getCategories-thunk";
import addCategoriesProductThunk from "../../api/asyncThunk/product-thunk/addCategories-thunk";
import { toast } from "react-toastify";
import classNames from "classnames";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { getMasterCategory, getCategory, getSubCategory, getBrand } =
    getCategoriesProductThunk;
  const {addProduct} = addCategoriesProductThunk;
  const getProductCategories = useSelector((state) => state.getProductCategory);
  const { masterCategoryDetails, categoryDetails, brandDetails,subCategoryDetails } =
    getProductCategories;

  const [formData, setFormData] = useState({
    masterCategory: "",
    category: "",
    subCategory: "",
    brand: "",
    productName: "",
    productAvgRating: "",
    gender: "",
    material: "",
    productDescription: "",
  });

  useEffect(() => {
    dispatch(getMasterCategory());
    dispatch(getBrand());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "masterCategory") {
        dispatch(getCategory({ masterCategoryName: value }));
      }
      if (name === "category") {
        dispatch(getSubCategory({ categoryName: value }));
      }
  };

  const handleSubmitBtn = () => {
    const dataToAddProduct = {
      productName: formData?.productName,
      productDescription: formData?.productDescription,
      productAvgRating: formData?.productAvgRating,
      gender: formData?.gender,
      material: formData?.material,
      masterCategory: {
        masterCategoryName: formData?.masterCategory,
      },
      category: {
        categoryName: formData?.category,
      },
      subCategory: {
        subCategoryName: formData?.subCategory,
      },
      brand: {
        brandName: formData?.brand,
      }
    }
    dispatch(addProduct(dataToAddProduct)).unwrap().
    then(()=>{
      toast.success('product added successfully.');
    }).catch(()=>{
      toast.error('there is an error while adding product.');
    })
  };

  const submitBtnStyle = classNames({
    'admin-addCategory-Btn' : true,
    'admin-addCategory-Btn-disabled':  Object.values(formData).some(value => value === ''),
  })
  return (
      <div className="admin-addProduct-main-container">
        <h2>Add Product</h2>
        <div className="admin-addProducts-container">
          <label htmlFor="masterCategory">
            Select a master category:
            <select
              id="masterCategory"
              name="masterCategory"
              className="admin-addCategory-dropdown"
              value={formData.masterCategory}
              onChange={handleChange}
            >
              <option value="">Select a master category</option>
              {masterCategoryDetails?.map((masterCategory) => {
                return (
                  <option value={masterCategory?.masterCategoryName}>
                    {masterCategory?.masterCategoryName}
                  </option>
                );
              })}
            </select>
          </label>

          {/* Category Dropdown */}
          <label htmlFor="category">
            Select a category:
            <select
              id="category"
              name="category"
              className="admin-addCategory-dropdown"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categoryDetails?.map((category) => {
                return (
                  <option value={category?.categoryName}>
                    {category?.categoryName}
                  </option>
                );
              })}
            </select>
          </label>

          {/* Sub-Category Dropdown */}
          <label htmlFor="subCategory">
            Select a sub-category:
            <select
              id="subCategory"
              name="subCategory"
              className="admin-addCategory-dropdown"
              value={formData.subCategory}
              onChange={handleChange}
            >
              <option value="">Select a sub-category</option>
              {subCategoryDetails?.map((subCategory) => {
                return (
                  <option value={subCategory?.subCategoryName}>
                    {subCategory?.subCategoryName}
                  </option>
                );
              })}
            </select>
          </label>

          {/* Brand Dropdown */}
          <label htmlFor="brand">
            Select a brand:
            <select
              id="brand"
              name="brand"
              className="admin-addCategory-dropdown"
              value={formData.brand}
              onChange={handleChange}
            >
              <option value="">Select a brand</option>
              {brandDetails?.map((brand) => {
                return (
                  <option value={brand?.brandName}>{brand?.brandName}</option>
                );
              })}{" "}
            </select>
          </label>

          {/* Product Name */}
          <label htmlFor="productName">
            Product name:
            <input
              id="productName"
              name="productName"
              className="admin-addCategory-input-code"
              placeholder="Type the product name"
              value={formData.productName}
              onChange={handleChange}
            />
          </label>

          {/* Product Average Rating */}
          <label htmlFor="productAvgRating">
            Product Average Rating:
            <input
              id="productAvgRating"
              name="productAvgRating"
              className="admin-addCategory-input-code"
              placeholder="Type the product average rating"
              value={formData.productAvgRating}
              onChange={handleChange}
            />
          </label>

          {/* Gender */}
          <label htmlFor="gender">
            Gender:
            <input
              id="gender"
              name="gender"
              className="admin-addCategory-input-code"
              placeholder="Type the gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </label>

          {/* Material */}
          <label htmlFor="material">
            Material:
            <input
              id="material"
              name="material"
              className="admin-addCategory-input-code"
              placeholder="Type the material"
              value={formData.material}
              onChange={handleChange}
            />
          </label>

          {/* Product Description */}
          <label htmlFor="productDescription">
            Product Description:
            <textarea
              id="productDescription"
              name="productDescription"
              className="admin-addCategory-input-code"
              placeholder="Type the product description"
              value={formData.productDescription}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className={submitBtnStyle} onClick={handleSubmitBtn} disabled={Object.values(formData).some(value => value === '')}>
          submit
        </button>
      </div>
  );
};

export default AddProduct;
