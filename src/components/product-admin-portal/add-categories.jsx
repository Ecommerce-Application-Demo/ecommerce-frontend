import React, { useEffect, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import addCategoriesProductThunk from "../../api/asyncThunk/product-thunk/addCategories-thunk";
import classNames from "classnames";
import getCategoriesProductThunk from "../../api/asyncThunk/product-thunk/getCategories-thunk";
import { toast } from "react-toastify";
import { resetAddBrand, resetAddCategory, resetAddMasterCategory, resetAddSubCategory } from "../../redux/Slices/product/addCategoriesSlice";

const AddCategories = () => {
  const dispatch = useDispatch();
  const getProductCategories = useSelector((state) => state.getProductCategory);
  const addProductCategories = useSelector((state) => state.addProductCategory);

  const { masterCategoryDetails, categoryDetails, } = getProductCategories;
  
  const { addMasterCategory, addCategory, addSubCategory, addBrand } = addCategoriesProductThunk;
  const { getMasterCategory, getCategory } = getCategoriesProductThunk;
  const [clickCategory, setClickCategory] = useState("");
  const [masterCategoryForm, setMasterCategoryForm] = useState({
    masterCategoryName: "",
    masterCategoryDescription: "",
    masterCategoryDefaultImage: '',
    breadcrumbUrl: '',
  });

  const [categoryForm, setCategoryForm] = useState({
    categoryName: "",
    categoryDescription: "",
    selectedMasterCategoryOption: "",
    categoryDefaultImage:'',
    breadcrumbUrl: '',
  });

  const [subCategoryForm, setSubCategoryForm] = useState({
    subCategoryName: "",
    subCategoryDescription: "",
    selectedMasterCategoryOption: "",
    selectedCategoryOption: "",
    subCategoryDefaultImage:'',
    breadcrumbUrl: '',
  });

  const [brandForm, setBrandForm] = useState({
    brandName: "",
    brandDescription: "",
    brandAddress: '',
    brandLogoImage:'',
    breadcrumbUrl: '',
  });
  
  useEffect(()=>{
    if (addProductCategories?.addMasterCategory?.SUCCESS) {
      toast.success('master category added successfully.')
    };

    if (addProductCategories?.addCategory?.SUCCESS) {
      toast.success('category added successfully.')
    };

    if (addProductCategories?.addSubCategory?.SUCCESS) {
      toast.success('sub category added successfully.')
    };

    if (addProductCategories?.addBrand?.SUCCESS) {
      toast.success('Brand added successfully.')
    };

  },[
    addProductCategories?.addMasterCategory?.SUCCESS, 
    addProductCategories?.addCategory?.SUCCESS, 
    addProductCategories?.addSubCategory?.SUCCESS, 
    addProductCategories?.addBrand?.SUCCESS
  ])
  
  const handleClickCategory = (category) => {
    setMasterCategoryForm({
      masterCategoryName: "",
      masterCategoryDescription: "",
    });
    setCategoryForm({
      categoryName: "",
      categoryDescription: "",
      selectedMasterCategoryOption: "",
    });
    setSubCategoryForm({
      subCategoryName: "",
      subCategoryDescription: "",
      selectedMasterCategoryOption: "",
      selectedCategoryOption: "",
    });
    setBrandForm({
      brandName: "",
      brandDescription: "",
      brandAddress: '',
    });
  
    setClickCategory((prevCategory) =>
      prevCategory === category ? "" : category
    );
    console.log(category, 'category');
    console.log(categoryForm?.selectedMasterCategoryOption, 'categoryForm');
    console.log(subCategoryForm?.selectedMasterCategoryOption, 'subCategoryForm');

    if (category === "category") {
      const dataToGetMasterCategory = {
        masterCategoryName: categoryForm?.selectedMasterCategoryOption
      }
      dispatch(getMasterCategory(dataToGetMasterCategory));
    } else if (category === "subCategory") {
      const dataToGetMasterCategory = {
        masterCategoryName: subCategoryForm?.selectedMasterCategoryOption
      }
      dispatch(getMasterCategory(dataToGetMasterCategory));
    }
  };

  const handleAddMasterCategory = (e) => {
    setMasterCategoryForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddCategory = (e) => {
    setCategoryForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleMasterCategoryDropdownCategory = (e) => {
    setCategoryForm((prevState) => ({
      ...prevState,
      selectedMasterCategoryOption: e.target.value,
    }));
  };

  const handleMasterCategoryDropdownSubCategory = (e) => {
    setSubCategoryForm((prevState) => ({
      ...prevState,
      selectedMasterCategoryOption: e.target.value,
    }));
      const dataForSubCategory = {
        masterCategoryName: e.target.value,
        categoryName: subCategoryForm?.selectedCategoryOption,
      };
      dispatch(getCategory(dataForSubCategory));
  }

  // ---------------------------------------all submit function ----------------------------
  const submitAddMasterCategory = () => {
    dispatch(addMasterCategory(masterCategoryForm)).unwrap()
    .then(()=>{
      setTimeout(() => {
        dispatch(resetAddMasterCategory());
      }, 5000);
    }).catch((error)=>{
      console.log(error);
    })
  };

  const submitAddCategory = () => {
    const dataForAddCategory = {
      categoryName: categoryForm?.categoryName,
      categoryDescription: categoryForm?.categoryDescription,
      categoryDefaultImage: categoryForm?.categoryDefaultImage,
      masterCategoryDto: {
        masterCategoryName: categoryForm?.selectedMasterCategoryOption,
      },
    };
    dispatch(addCategory(dataForAddCategory)).unwrap()
    .then(()=>{
      setTimeout(() => {
        dispatch(resetAddCategory());
      }, 5000);
    })
  };
  const handleAddSubCategory = (e) => {
    setSubCategoryForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubCategoryDropdownChange = (e) => {
    setSubCategoryForm((prevState) => ({
      ...prevState,
      selectedCategoryOption: e.target.value,
    }));
  };

  const submitAddSubCategory = () => {
    const dataForAddSubCategory = {
      subCategoryName: subCategoryForm?.subCategoryName,
      subCategoryDescription: subCategoryForm?.subCategoryDescription,
      subCategoryDefaultImage: subCategoryForm?.subCategoryDefaultImage,
      categoryDto: {
        categoryName: subCategoryForm?.selectedCategoryOption,
      },
    };
    dispatch(addSubCategory(dataForAddSubCategory)).unwrap()
    .then(()=>{
      setTimeout(() => {
        dispatch(resetAddSubCategory());
      }, 5000);
    })
  };

  const handleAddBrand = (e) => {
    setBrandForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitAddBrand = () => {
    dispatch(addBrand(brandForm)).unwrap()
    .then(()=>{
      setTimeout(() => {
        dispatch(resetAddBrand());
      }, 5000);
    })
  };  
  
  const subCategorySubmitBtn = classNames({
    "admin-addCategory-Btn": true,
    "admin-addCategory-Btn-disabled": subCategoryForm.subCategoryName === "" || addProductCategories?.addSubCategory?.START,
  });

  const addSubCategoryInput = classNames({
    "admin-addCategory-input": true,
    "admin-addCategory-input-disabled": subCategoryForm?.selectedMasterCategoryOption === "" || subCategoryForm?.selectedCategoryOption === "",
  });

  const masterCategorySubmitBtn = classNames({
    "admin-addCategory-Btn": true,
    "admin-addCategory-Btn-disabled":
      masterCategoryForm.masterCategoryName === "" || addProductCategories?.addMasterCategory?.START,
  });
  const addCategoryInput = classNames({
    "admin-addCategory-input": true,
    "admin-addCategory-input-disabled":
      categoryForm?.selectedMasterCategoryOption === "",
  });
  const categorySubmitBtn = classNames({
    "admin-addCategory-Btn": true,
    "admin-addCategory-Btn-disabled": categoryForm.categoryName === "" ||  addProductCategories?.addCategory?.START,
  });

  const brandSubmitBtn = classNames({
    "admin-addCategory-Btn": true,
    "admin-addCategory-Btn-disabled": brandForm?.brandName === ""||  addProductCategories?.addBrand?.START,
  })
  return (
<div className="admin-addCategories-container">
        <div className="admin-addCategories-wrapper">
          <div
            className={`admin-addCategories-collaps-wrapper ${
              clickCategory === "masterCategory" && "active-category"
            }`}
            onClick={() => handleClickCategory("masterCategory")}
          >
            <p>ADD MASTER CATEGORY</p>
            {clickCategory !== "masterCategory" ? (
              <SlArrowDown />
            ) : (
              <SlArrowUp />
            )}
          </div>
          {clickCategory === "masterCategory" && (
            <div className="admin-addCategories-expand-wrapper">
              <div className="admin-category-option-wrapper">
                <input
                  id="masterCategoryName"
                  className="admin-addCategory-input"
                  placeholder="your master category name"
                  name="masterCategoryName"
                  value={masterCategoryForm.masterCategoryName}
                  onChange={handleAddMasterCategory}
                />
                 <input
                  id="masterCategoryDefaultImage"
                  className="admin-addCategory-input"
                  placeholder="master category default image"
                  name="masterCategoryDefaultImage"
                  value={masterCategoryForm.masterCategoryDefaultImage}
                  onChange={handleAddMasterCategory}
                />
              <input
                className="admin-addCategory-input"
                type="text"
                name="breadcrumbUrl"
                placeholder="enter breadcrumb URL"
                value={masterCategoryForm.breadcrumbUrl}
                onChange={handleAddMasterCategory}
              />
                <textarea
                  id="masterCategoryDescription"
                  placeholder="Write a description for your master category"
                  className="admin-addCategory-textArea"
                  name="masterCategoryDescription"
                  value={masterCategoryForm.masterCategoryDescription}
                  onChange={handleAddMasterCategory}
                />
              </div>
              <button
                className={masterCategorySubmitBtn}
                onClick={submitAddMasterCategory}
                disabled={masterCategoryForm.masterCategoryName === ""}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div className="admin-addCategories-wrapper">
          <div
            className={`admin-addCategories-collaps-wrapper ${
              clickCategory === "category" && "active-category"
            }`}
            onClick={() => handleClickCategory("category")}
          >
            <p>ADD CATEGORY</p>
            {clickCategory !== "category" ? <SlArrowDown /> : <SlArrowUp />}
          </div>
          {clickCategory === "category" && (
            <div className="admin-addCategories-expand-wrapper">
              <div className="admin-category-option-wrapper">
                <select
                  id="categoryDropdown"
                  className="admin-addCategory-dropdown"
                  onChange={handleMasterCategoryDropdownCategory}
                  value={categoryForm.selectedMasterCategoryOption}
                >
                  <option value="">Select an master category</option>
                  {masterCategoryDetails?.map((masterCategory) => {
                    return (
                      <option value={masterCategory?.masterCategoryName}>
                        {masterCategory?.masterCategoryName}
                      </option>
                    );
                  })}
                </select>
                <input
                  id="categoryName"
                  className={addCategoryInput}
                  placeholder="your category name"
                  name="categoryName"
                  disabled={categoryForm.selectedMasterCategoryOption === ""}
                  value={categoryForm.categoryName}
                  onChange={handleAddCategory}
                />
                 <input
                  id="categoryDefaultImage"
                  className={addCategoryInput}
                  placeholder="category default image"
                  name="categoryDefaultImage"
                  disabled={categoryForm.selectedMasterCategoryOption === ""}
                  value={categoryForm.categoryDefaultImage}
                  onChange={handleAddCategory}
                />
                <input
                  className={addCategoryInput}
                  type="text"
                  name="breadcrumbUrl"
                  placeholder="enter breadcrumb URL"
                  value={categoryForm.breadcrumbUrl}
                  onChange={handleAddCategory}
                  disabled={categoryForm?.selectedMasterCategoryOption === ""}
                />
                <textarea
                  id="categoryDescription"
                  placeholder="Write a description for your category"
                  className="admin-addCategory-textArea"
                  name="categoryDescription"
                  value={categoryForm.categoryDescription}
                  onChange={handleAddCategory}
                />
              </div>
              <button
                className={categorySubmitBtn}
                onClick={submitAddCategory}
                disabled={categoryForm.categoryName === ""}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div className="admin-addCategories-wrapper">
          <div
            className={`admin-addCategories-collaps-wrapper ${
              clickCategory === "subCategory" && "active-category"
            }`}
            onClick={() => handleClickCategory("subCategory")}
          >
            <p>ADD SUB CATEGORY</p>
            {clickCategory !== "subCategory" ? <SlArrowDown /> : <SlArrowUp />}
          </div>
          {clickCategory === "subCategory" && (
            <div className="admin-addCategories-expand-wrapper">
              <div className="admin-category-option-wrapper">
                <select
                  id="subCategoryDropdown"
                  className="admin-addCategory-dropdown"
                  onChange={handleMasterCategoryDropdownSubCategory}
                  value={subCategoryForm.selectedMasterCategoryOption}
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
                <select
                  id="subCategoryDropdown"
                  className="admin-addCategory-dropdown"
                  onChange={handleSubCategoryDropdownChange}
                  value={subCategoryForm.selectedCategoryOption}
                >
                  <option value="">Select a category</option>
                  {categoryDetails?.map(category=>{
                    return (
                        <option value={category?.categoryName}>{category?.categoryName}</option>
                    )
                  })}
                </select>
                <input
                  id="subCategoryName"
                  className={addSubCategoryInput}
                  placeholder="your sub category name"
                  name="subCategoryName"
                  disabled={
                    subCategoryForm.selectedMasterCategoryOption === '' ||
                    subCategoryForm.selectedCategoryOption === ''
                  }
                  value={subCategoryForm.subCategoryName}
                  onChange={handleAddSubCategory}
                />
                <input
                  id="subCategoryDefaultImage"
                  className={addSubCategoryInput}
                  placeholder="sub category default image"
                  name="subCategoryDefaultImage"
                  disabled={
                    subCategoryForm.selectedMasterCategoryOption === '' ||
                    subCategoryForm.selectedCategoryOption === ''
                  }
                  value={subCategoryForm.subCategoryDefaultImage}
                  onChange={handleAddSubCategory}
                />
                <input
                className={addSubCategoryInput}
                type="text"
                name="breadcrumbUrl"
                placeholder="enter breadcrumb URL"
                value={subCategoryForm.breadcrumbUrl}
                onChange={handleAddSubCategory}
                disabled={
                  subCategoryForm?.selectedMasterCategoryOption === "" ||
                  subCategoryForm?.selectedCategoryOption === ""
                }
              />
                <textarea
                  id="subCategoryDescription"
                  placeholder="Write a description for your sub category"
                  className="admin-addCategory-textArea"
                  name="subCategoryDescription"
                  value={subCategoryForm.subCategoryDescription}
                  onChange={handleAddSubCategory}
                />
              </div>
              <button
                className={subCategorySubmitBtn}
                onClick={submitAddSubCategory}
                disabled={subCategoryForm.subCategoryName === ""}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div className="admin-addCategories-wrapper">
          <div
            className={`admin-addCategories-collaps-wrapper ${
              clickCategory === "brand" && "active-category"
            }`}
            onClick={() => handleClickCategory("brand")}
          >
            <p>ADD BRAND</p>
            {clickCategory !== "brand" ? <SlArrowDown /> : <SlArrowUp />}
          </div>
          {clickCategory === "brand" && (
            <div className="admin-addCategories-expand-wrapper">
              <div className="admin-category-option-wrapper">
                <input
                  id="brandName"
                  className="admin-addCategory-input"
                  placeholder="your brand name"
                  name="brandName"
                  value={brandForm?.brandName}
                  onChange={handleAddBrand}
                /> 
                 <input
                  id="brandLogoImage"
                  className="admin-addCategory-input"
                  placeholder="brand default image"
                  name="brandLogoImage"
                  value={brandForm?.brandLogoImage}
                  onChange={handleAddBrand}
                /> 
                <textarea
                  id="brandDescription"
                  placeholder="Write a description for your brand"
                  className="admin-addCategory-textArea"
                  name="brandDescription"
                  value={brandForm?.brandDescription}
                  onChange={handleAddBrand}
                />
                <textarea
                  id="brandAddress"
                  placeholder="Write an address for your brand"
                  className="admin-addCategory-textArea"
                  name="brandAddress"
                  value={brandForm?.brandAddress}
                  onChange={handleAddBrand}
                />
              </div>
              <button
                className={brandSubmitBtn}
                onClick={submitAddBrand}
                disabled={brandForm?.brandName === ""}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default AddCategories;
