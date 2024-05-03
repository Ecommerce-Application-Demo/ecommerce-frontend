import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addCategoriesProductThunk from "../../api/asyncThunk/product-thunk/addCategories-thunk";
import { toast } from "react-toastify";
import classNames from "classnames";
import getProductThunk from "../../api/asyncThunk/product-thunk/getProductThunk";

const AddProductSku = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { allProduct } = getProducts;
  const { addProductSkuThunk } = addCategoriesProductThunk;
  const { getAllProductThunk } = getProductThunk;
  const [formData, setFormData] = useState({
    productId: "",
    colour: "",
    mrp: "",
    discountPercentage: "",
    images: [],
    sizeVariants: [],
  });

  useEffect(() => {
    dispatch(getAllProductThunk());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "defaultImage") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: {
          ...prevFormData.images,
          defaultImage: value,
        },
      }));
    } else if (name.startsWith("image")) {
      const imageNumber = parseInt(name.replace("image", ""));
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

  const handleAddImage = () => {
    const hasDefaultImage = Object.keys(formData.images).includes(
      "defaultImage"
    );
    const nextImageName = hasDefaultImage
      ? `image${Object.keys(formData.images).length + 1}`
      : "defaultImage";

    setFormData((prevFormData) => ({
      ...prevFormData,
      images: {
        ...prevFormData.images,
        [nextImageName]: "",
      },
    }));
  };

  const handleSizeVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newSizeVariants = [...formData.sizeVariants];
    newSizeVariants[index][name] = value;
    setFormData({
      ...formData,
      sizeVariants: newSizeVariants,
    });
  };

  const handleAddSizeVariant = () => {
    setFormData({
      ...formData,
      sizeVariants: [
        ...formData.sizeVariants,
        {
          size: "",
          sizeDetailsImageUrl: "",
          quantity: "",
          availablePincodes: "",
        },
      ],
    });
  };
  const handleRemoveSizeVariant = (index) => {
    const newSizeVariants = [...formData.sizeVariants];
    newSizeVariants.splice(index, 1); // Remove the size variant at the specified index
    setFormData({
      ...formData,
      sizeVariants: newSizeVariants,
    });
  };

  const handleSubmitBtn = () => {
    const dataToAddProductSku = {
      productId: formData.productId,
      colour: formData.colour,
      mrp: formData.mrp,
      discountPercentage: formData.discountPercentage,
      images: formData.images,
      sizeVariantDetails: formData.sizeVariants,
    };
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
    'admin-addCategory-Btn-disabled' : Object.keys(formData.images).length < 2 || formData.sizeVariants.length === 0 || 
    formData.sizeVariants.some((variant) => {
      return Object.values(variant).some((value) => value === "");
  }),
});

  return (
    <div className="admin-addProduct-main-container">
      <p>ADD PRODUCT SKU</p>
        <div className="admin-addProduct-buttons-container">
      <button onClick={handleAddSizeVariant}>Add New Size Variant</button>
      <button onClick={handleAddImage}>Add Image</button>
        </div>
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
                <option value={product?.productId} key={product?.productId}>
                  {product?.productName}
                </option>
              );
            })}
          </select>
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

        {/* Image inputs */}
        {Object.entries(formData.images).map(([key, value]) => (
          <label htmlFor={key} key={key}>
            {key}:
            <input
              id={key}
              name={key}
              className="admin-addCategory-input-code"
              placeholder={`Enter the image URL for ${key}`}
              value={value}
              onChange={handleChange}
            />
          </label>
        ))}

        {/* Render size variants */}
        {formData.sizeVariants?.map((sizeVariant, index) => (
          <div>
          <div className="sizeVariants-btn-wrapper">
          <h3>add size variant {index+1}</h3>
          <button onClick={() => handleRemoveSizeVariant(index)}>Remove</button>
          </div>
          <div className="sizeVariants-wrapper">
            <label htmlFor={`size_${index}`}>
              Size:
              <input
                id={`size_${index}`}
                name="size"
                className="admin-addCategory-input-code" 
                placeholder="Enter the size"
                value={sizeVariant.size}
                onChange={(e) => handleSizeVariantChange(index, e)}
              />
            </label>
            <label htmlFor={`sizeDetailsImageUrl_${index}`}>
              Size Details Image URL:
              <input
                id={`sizeDetailsImageUrl_${index}`}
                name="sizeDetailsImageUrl"
                className="admin-addCategory-input-code" // Add this class name
                placeholder="Enter the size details image URL"
                value={sizeVariant.sizeDetailsImageUrl}
                onChange={(e) => handleSizeVariantChange(index, e)}
              />
            </label>
            <label htmlFor={`quantity_${index}`}>
              Quantity:
              <input
                id={`quantity_${index}`}
                name="quantity"
                className="admin-addCategory-input-code" 
                placeholder="Enter the quantity"
                value={sizeVariant.quantity}
                onChange={(e) => handleSizeVariantChange(index, e)}
              />
            </label>
            <label htmlFor={`availablePincodes_${index}`}>
              Available Pincodes:
              <input
                id={`availablePincodes_${index}`}
                name="availablePincodes"
                className="admin-addCategory-input-code" 
                placeholder="Enter available pincodes"
                value={sizeVariant.availablePincodes}
                onChange={(e) => handleSizeVariantChange(index, e)}
              />
            </label>
          </div>
          </div>
        ))}
      </div>
      <button
        className={submitBtnStyle}
        onClick={handleSubmitBtn}
        disabled={
          Object.keys(formData.images).length < 2 ||
          formData.sizeVariants.length === 0 ||  formData.sizeVariants.some((variant) => {
            return Object.values(variant).some((value) => value === "");
        })
        }>
        Submit
      </button>
    </div>
  );
};

export default AddProductSku;
