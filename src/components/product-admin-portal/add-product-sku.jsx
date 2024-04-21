import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addCategoriesProductThunk from "../../api/asyncThunk/product-thunk/addCategories-thunk";
import { toast } from "react-toastify";
import classNames from "classnames";
import getProductThunk from "../../api/asyncThunk/product-thunk/getProductThunk";

const AddProductSku = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state)=> state.getProducts);
    const { allProduct } = getProducts;
  const { addProductSkuThunk } = addCategoriesProductThunk;
  const { getAllProductThunk } = getProductThunk;
  const [formData, setFormData] = useState({
    productId: "",
    size: "",
    colour: "",
    mrp: "",
    discountPercentage: "",
    images: {
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
    image7: "",
    },
    quantity: "",
    availablePincodes: "",
  });

  useEffect(()=>{
    dispatch(getAllProductThunk());
  },[]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("image")) {
      const imageNumber = name.slice(-1);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: {
          ...prevFormData.images,
          [`image${imageNumber}`]: value, 
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmitBtn = () => {
    const dataToAddProductSku = { ...formData };
    dispatch(addProductSkuThunk(dataToAddProductSku))
      .unwrap()
      .then(() => {
        toast.success("Product SKU added successfully.");
      })
      .catch(() => {
        toast.error("There was an error while adding the product SKU.");
      });
  };

  const submitBtnStyle = classNames({
    "admin-addCategory-Btn": true,
    "admin-addCategory-Btn-disabled": Object.values(formData).some(
      (value) => value === ""
    ),
  });
console.log(formData);
  return (
      <div className="admin-addProduct-main-container">
        <h2>ADD PRODUCT SKU</h2>
        <div className="admin-addProducts-container">
          <label htmlFor="productId">
            Product name:
            <select
              id="productId"
              name="productId"
              className="admin-addCategory-dropdown"
              value={formData.productId}
              onChange={handleChange}
            >
              <option value="">Select a product name</option>
              {allProduct?.map((product) => {
                return (
                  <option value={product?.productId}>
                    {product?.productName}
                  </option>
                );
              })}
            </select>
          </label>

          {/* Size */}
          <label htmlFor="size">
            Size:
            <input
              id="size"
              name="size"
              className="admin-addCategory-input-code"
              placeholder="Enter the size"
              value={formData.size}
              onChange={handleChange}
            />
          </label>

          {/* Colour */}
          <label htmlFor="colour">
            Colour:
            <input
              id="colour"
              name="colour"
              className="admin-addCategory-input-code"
              placeholder="Enter the colour"
              value={formData.colour}
              onChange={handleChange}
            />
          </label>

          {/* MRP */}
          <label htmlFor="mrp">
            MRP:
            <input
              id="mrp"
              name="mrp"
              className="admin-addCategory-input-code"
              placeholder="Enter the MRP"
              value={formData.mrp}
              onChange={handleChange}
            />
          </label>

          {/* Discount Percentage */}
          <label htmlFor="discountPercentage">
            Discount Percentage:
            <input
              id="discountPercentage"
              name="discountPercentage"
              className="admin-addCategory-input-code"
              placeholder="Enter the discount percentage"
              value={formData.discountPercentage}
              onChange={handleChange}
            />
          </label>

          {/* Image 1 */}
          <label htmlFor="image1">
            Image 1:
            <input
              id="image1"
              name="image1"
              className="admin-addCategory-input-code"
              placeholder="Enter the image URL"
              value={formData.image1}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="image2">
            Image 2:
            <input
              id="image2"
              name="image2"
              className="admin-addCategory-input-code"
              placeholder="Enter the image URL"
              value={formData.image2}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="image3">
            Image 3:
            <input
              id="image3"
              name="image3"
              className="admin-addCategory-input-code"
              placeholder="Enter the image URL"
              value={formData.image3}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="image4">
            Image 4:
            <input
              id="image4"
              name="image4"
              className="admin-addCategory-input-code"
              placeholder="Enter the image URL"
              value={formData.image4}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="image5">
            Image 5:
            <input
              id="image5"
              name="image5"
              className="admin-addCategory-input-code"
              placeholder="Enter the image URL"
              value={formData.image5}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="image6">
            Image 6:
            <input
              id="image6"
              name="image6"
              className="admin-addCategory-input-code"
              placeholder="Enter the image URL"
              value={formData.image6}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="image7">
            Image 7:
            <input
              id="image7"
              name="image7"
              className="admin-addCategory-input-code"
              placeholder="Enter the image URL"
              value={formData.image7}
              onChange={handleChange}
            />
          </label>

          {/* Add more image inputs as needed */}

          {/* Quantity */}
          <label htmlFor="quantity">
            Quantity:
            <input
              id="quantity"
              name="quantity"
              className="admin-addCategory-input-code"
              placeholder="Enter the quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </label>

          {/* Available Pincodes */}
          <label htmlFor="availablePincodes">
            Available Pincodes:
            <input
              id="availablePincodes"
              name="availablePincodes"
              className="admin-addCategory-input-code"
              placeholder="Enter available pincodes"
              value={formData.availablePincodes}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          className={submitBtnStyle}
          onClick={handleSubmitBtn}
          disabled={Object.values(formData).some((value) => value === "")}
        >
          Submit
        </button>
      </div>
  );
};

export default AddProductSku;
