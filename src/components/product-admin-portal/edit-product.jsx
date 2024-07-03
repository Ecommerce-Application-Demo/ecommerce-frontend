import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../small-components/Modal-global";
import { toast } from "react-toastify";
import classNames from "classnames";
import getCategoriesProductThunk from "../../api/asyncThunk/product-thunk/getCategories-thunk";
import addCategoriesProductThunk from "../../api/asyncThunk/product-thunk/addCategories-thunk";
import { resetGetSubCategory } from "../../redux/Slices/product/getCategoriesSlice";

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const { modalOpen, setModalOpen, editProduct } = props;

  // Fetching necessary data from Redux store
  const getProductCategories = useSelector((state) => state.getProductCategory);

  const {
    masterCategoryDetails,
    categoryDetails,
    brandDetails,
    subCategoryDetails,
  } = getProductCategories;


  // Form data state
  const [formData, setFormData] = useState({
    productId:'',
    masterCategory: "",
    category: '',
    subCategory: '',
    brand: "",
    productName: "",
    productAvgRating: "",
    gender: "",
    material: "",
    productDescription: "",
  });

  useEffect(() => {
    dispatch(getCategoriesProductThunk.getMasterCategory());
    dispatch(getCategoriesProductThunk.getBrand());
  }, []);

  useEffect(() => {
    if (editProduct?.masterCategory?.masterCategoryName)
      dispatch(
        getCategoriesProductThunk.getCategory({
          masterCategoryName: editProduct?.masterCategory?.masterCategoryName,
        })
      );
    if (editProduct?.category?.categoryName)
      dispatch(
        getCategoriesProductThunk.getSubCategory({
          categoryName: editProduct?.category?.categoryName,
        })
      );
  }, [
    editProduct?.masterCategory?.masterCategoryName,
    editProduct?.category?.categoryName,
  ]);

  useEffect(() => {
    if (editProduct) {
      setFormData({
        masterCategory: editProduct?.masterCategory?.masterCategoryName,
        category: editProduct?.category?.categoryName,
        subCategory: editProduct?.subCategory?.subCategoryName,
        brand: editProduct?.brand?.brandName,
        productName: editProduct?.productName,
        productId: editProduct?.productId,
        productAvgRating: editProduct?.productAvgRating,
        gender: editProduct?.gender,
        material: editProduct?.material,
        productDescription: editProduct?.productDescription,
      });
    }
  }, [editProduct]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "masterCategory") {
      dispatch(
        getCategoriesProductThunk.getCategory({ masterCategoryName: value })
      );
      dispatch(resetGetSubCategory());
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: "",
        subCategory: "",
      }));
    }
    if (name === "category") {
      dispatch(
        getCategoriesProductThunk.getSubCategory({ categoryName: value })
      );
    }
  };

  // Handle form submission
  const handleSubmitBtn = () => {
    const dataToAddProduct = {
      productId: formData?.productId,
      productName: formData.productName,
      productDescription: formData.productDescription,
      productAvgRating: formData.productAvgRating,
      gender: formData.gender,
      material: formData.material,
      masterCategory: {
        masterCategoryName: formData.masterCategory,
      },
      category: {
        categoryName: formData.category,
      },
      subCategory: {
        subCategoryName: formData.subCategory,
      },
      brand: {
        brandName: formData.brand,
      },
    };

    dispatch(addCategoriesProductThunk.addProduct(dataToAddProduct))
      .unwrap()
      .then(() => {
        toast.success("Product edited successfully.");
        setModalOpen(false);
      })
      .catch(() => {
        toast.error("There is an error while editing product.");
      });
  };

  const submitBtnStyle = classNames({
    "admin-addCategory-Btn": true,
    "admin-addCategory-Btn-disabled": Object.values(formData).some(
      (value) => value === "" ||value === undefined),
  });

  return (
    <Modal
      width="600px"
      title="Edit Product"
      onClose={() => setModalOpen(false)}
      height="500px"
      widthForMobile='100vw'
      heightForMobile='90vh'
      footer={
        <div className="editProduct-btn-footer">
          <div
            className={submitBtnStyle}
            onClick={!Object.values(formData).some(
              (value) => value === "" ||value === undefined) ? handleSubmitBtn: null}
          >
            Save
          </div>
          <div
          className="admin-addCategory-cancelBtn"
            style={{ backgroundColor: "grey", color:'white', textAlign:'center',display:'flex' }}
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </div>
        </div>
      }
    >
      <div className="admin-editProduct-main-container">
        <div className="admin-addProducts-container">
          {/* productId */}
        <label htmlFor="productId">
            product ID:
            <input
              id="productId"
              name="productId"
              className="admin-addCategory-input-disabled"
              value={formData?.productId}
              readOnly
            />
          </label>
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
              {masterCategoryDetails?.map((masterCategory) => (
                <option
                  key={masterCategory.masterCategoryName}
                  value={masterCategory.masterCategoryName}
                >
                  {masterCategory.masterCategoryName}
                </option>
              ))}
            </select>
          </label>

          {/* Category Dropdown */}
          <label htmlFor="category">
            Select a category:
            <select
              id="category"
              name="category"
              className="admin-addCategory-dropdown"
              value={formData.category || ""}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categoryDetails?.map((category) => (
                <option
                  key={category.categoryName}
                  value={category.categoryName}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </label>

          {/* Sub-Category Dropdown */}
          <label htmlFor="subCategory">
            Select a sub-category:
            <select
              id="subCategory"
              name="subCategory"
              className="admin-addCategory-dropdown"
              value={formData.subCategory || ""}
              onChange={handleChange}
            >
              <option value="">Select a sub-category</option>
              {subCategoryDetails?.map((subCategory) => (
                <option
                  key={subCategory.subCategoryName}
                  value={subCategory.subCategoryName}
                >
                  {subCategory.subCategoryName}
                </option>
              ))}
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
              {brandDetails?.map((brand) => (
                <option key={brand.brandName} value={brand.brandName}>
                  {brand.brandName}
                </option>
              ))}
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
      </div>
    </Modal>
  );
};

export default EditProduct;
