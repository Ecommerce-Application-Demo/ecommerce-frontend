import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addCategoriesProductThunk from "../../api/asyncThunk/product-thunk/addCategories-thunk";
import { toast } from "react-toastify";
import classNames from "classnames";
import getProductThunk from "../../api/asyncThunk/product-thunk/getProductThunk";
import Modal from "../../small-components/Modal-global";

const AddProductSku = ({
  setOpenStyleModal,
  productClick,
}) => {
  const dispatch = useDispatch();
  const { addProductSkuThunk } = addCategoriesProductThunk;
  const [formData, setFormData] = useState({
    styleName: "",
    colour: "",
    colourHexCode: '',
    mrp: "",
    discountPercentage: "",
    images: [],
    sizeDetailsImageUrl: '',
    sizeVariants: [],
  });
  const productName = productClick?.productName;

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
          quantity: "",
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
      productId: productClick?.productId,
      styleName: formData.styleName,
      colour: formData.colour,
      mrp: formData.mrp,
      discountPercentage: formData.discountPercentage,
      images: formData.images,
      sizeDetailsImageUrl: formData.sizeDetailsImageUrl,
      sizeVariantDetails: formData.sizeVariants,
    };
    dispatch(addProductSkuThunk(dataToAddProductSku))
      .unwrap()
      .then(() => {
        toast.success("Product Style added successfully.");
      })
      .catch(() => {
        toast.error("There was an error while adding the product SKU.");
      });
  };

  const submitBtnStyle = classNames({
    "admin-addCategory-Btn": true,
    'admin-addCategory-Btn-disabled': Object.keys(formData.images).length < 2 || formData.sizeVariants.length === 0 ||
      formData.sizeVariants.some((variant) => {
        return Object.values(variant).some((value) => value === "");
      }),
  });
  return (
    <Modal
      width="65vw"
      height='80vh'
      onClose={()=>setOpenStyleModal(false)}
      title={`ADD PRODUCT STYLES FOR ${productName}`}
      footer=<button
        className={submitBtnStyle}
        onClick={handleSubmitBtn}
        disabled={
          Object.keys(formData.images).length < 2 ||
          formData.sizeVariants.length === 0 || formData.sizeVariants.some((variant) => {
            return Object.values(variant).some((value) => value === "");
          })}>
        Submit
      </button>
    >
      <div className="admin-addProduct-main-container">
        <div className="admin-addProduct-buttons-container">
          <button onClick={handleAddSizeVariant}>Add New Size Variant</button>
          <button onClick={handleAddImage}>Add Image</button>
        </div>
        <div className="admin-addProducts-container">
          <label htmlFor="productName">
            Style name:
            <input
              id="styleName"
              name="styleName"
              className="admin-addCategory-input-code"
              placeholder="Enter the name of styles"
              value={formData.styleName}
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

          {/* Colour */}
          <label htmlFor="colourHexCode">
            Colour:
            <input
              id="colourHexCode"
              name="colourHexCode"
              className="admin-addCategory-input-code"
              placeholder="Enter the colourHexCode"
              value={formData.colourHexCode}
              onChange={handleChange}
            />
          </label>

          {/* sizeDetailsImageUrl */}
          <label htmlFor="sizeDetailsImageUrl">
          Size Details Image Url:
            <input
              id="sizeDetailsImageUrl"
              name="sizeDetailsImageUrl"
              className="admin-addCategory-input-code"
              placeholder="Enter the sizeDetailsImageUrl"
              value={formData.sizeDetailsImageUrl}
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
            <div style={{width: '100%'}}>
              <div className="sizeVariants-btn-wrapper">
                <h3>add size variant {index + 1}</h3>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AddProductSku;
