import React, { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import addCategoriesProductThunk from "../../api/asyncThunk/product-thunk/addCategories-thunk";
import classNames from "classnames";
import getCategoriesProductThunk from "../../api/asyncThunk/product-thunk/getCategories-thunk";

const AddCategories = () => {
  const dispatch = useDispatch();
  const productCategories = useSelector((state) => state.getProductCategory);
  const { masterCategoryDetails, categoryDetails } = productCategories;
  const { addMasterCategory, addCategory, addSubCategory } = addCategoriesProductThunk;
  const { getMasterCategory,getCategory } = getCategoriesProductThunk;

  const [clickCategory, setClickCategory] = useState("");
  const [masterCategoryForm, setMasterCategoryForm] = useState({
    masterCategoryName: "",
    masterCategoryDescription: "",
  });

  const [categoryForm, setCategoryForm] = useState({
    categoryName: "",
    categoryDescription: "",
    selectedMasterCategoryOption: "select",
  });

  const [subCategoryForm, setSubCategoryForm] = useState({
    subCategoryName: "",
    subCategoryDescription: "",
    selectedMasterCategoryOption: "select",
    selectedCategoryOption: "select",
  });

  const handleClickCategory = (category) => {
    setClickCategory((prevCategory) =>
      prevCategory === category ? "" : category
    );

    if (category === "category" || category === 'subCategory') {
      dispatch(getMasterCategory());
    };
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
  const handleMasterCategoryDropdownChange = (e) => {
    setCategoryForm((prevState) => ({
      ...prevState,
      selectedMasterCategoryOption: e.target.value,
    }));
    setSubCategoryForm((prevState) => ({
      ...prevState,
      selectedMasterCategoryOption: e.target.value,
    }));
    if (clickCategory === 'subCategory') {
      const dataForSubCategory = {
        subCategoryName: subCategoryForm?.subCategoryName,
        subCategoryDescription: subCategoryForm?.subCategoryDescription,
        masterCategoryDto: {
          masterCategoryName: subCategoryForm?.selectedMasterCategoryOption,
        },
        categoryDto: {
          categoryName: subCategoryForm?.selectedCategoryOption,
        }
      };
      dispatch(getCategory(dataForSubCategory));
    }
  };

  // ---------------------------------------all submit function ----------------------------
  const submitAddMasterCategory = () => {
    dispatch(addMasterCategory(masterCategoryForm));
  };

  const submitAddCategory = () => {
    const dataForAddCategory = {
      categoryName: categoryForm?.categoryName,
      categoryDescription: categoryForm?.categoryDescription,
      masterCategoryDto: {
        masterCategoryName: categoryForm?.selectedCategoryOption,
      },
    };
    dispatch(addCategory(dataForAddCategory));
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
      categoryDto: {
        categoryName: subCategoryForm?.selectedSubCategoryOption,
      },
    };
    dispatch(addSubCategory(dataForAddSubCategory));
  };

  const subCategorySubmitBtn = classNames({
    "admin-addCategory-Btn": true,
    "admin-addCategory-Btn-disabled": subCategoryForm.subCategoryName === "",
  });

  const addSubCategoryInput = classNames({
    "admin-addCategory-input": true,
    "admin-addCategory-input-disabled": subCategoryForm?.selectedMasterCategoryOption === "select" || subCategoryForm?.selectedCategoryOption === "select",
  });

  const masterCategorySubmitBtn = classNames({
    "admin-addCategory-Btn": true,
    "admin-addCategory-Btn-disabled":
      masterCategoryForm.masterCategoryName === "",
  });
  const addCategoryInput = classNames({
    "admin-addCategory-input": true,
    "admin-addCategory-input-disabled":
      categoryForm?.selectedCategoryOption === "select",
  });
  const categorySubmitBtn = classNames({
    "admin-addCategory-Btn": true,
    "admin-addCategory-Btn-disabled": categoryForm.categoryName === "",
  });
  console.log(categoryForm.selectedCategoryOption);
  return (
    <div className="global-margin">
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
                  placeholder="Type your master category name"
                  name="masterCategoryName"
                  value={masterCategoryForm.masterCategoryName}
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
                  onChange={handleMasterCategoryDropdownChange}
                  value={categoryForm.selectedMasterCategoryOption}
                >
                  <option value="select">Select an master category</option>
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
                  placeholder="Type your category name"
                  name="categoryName"
                  disabled={categoryForm.selectedMasterCategoryOption === "select"}
                  value={categoryForm.categoryName}
                  onChange={handleAddCategory}
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
                  onChange={handleMasterCategoryDropdownChange}
                  value={subCategoryForm.selectedMasterCategoryOption}
                >
                  <option value="select">Select a master category</option>
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
                  <option value="select">Select a category</option>
                  {categoryDetails?.map(category=>{
                    return (
                        <option value={category?.categoryName}>{category?.categoryName}</option>
                    )
                })}
                </select>
                <input
                  id="subCategoryName"
                  className={addSubCategoryInput}
                  placeholder="Type your sub category name"
                  name="subCategoryName"
                  disabled={
                    subCategoryForm.selectedMasterCategoryOption === "select" ||
                    subCategoryForm.selectedCategoryOption === "select"

                  }
                  value={subCategoryForm.subCategoryName}
                  onChange={handleAddSubCategory}
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
      </div>
    </div>
  );
};

export default AddCategories;
