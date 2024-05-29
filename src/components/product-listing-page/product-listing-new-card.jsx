import React, { useState } from "react";
import { products } from "../../assets/pictures/productImageAddress";
import { motion } from "framer-motion";
import ProductCarousel from "./product-listing-courosel";
import { createOverlay, isColorLight } from "../../uiHelper/uiHelper";

const ProductListingNewCard = ({ color }) => {
  const [openCourosel, setOpenCourosel] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hoveredTextColor = {
    color: openCourosel ? (isColorLight(color) ? "black" : "white") : "",
  };

  return (
    <motion.div
      className="product-new-card-container"
      onHoverStart={() => setOpenCourosel(true)}
      onHoverEnd={() => setOpenCourosel(false)}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ "--card-color": createOverlay(color) }}
    >
      {!openCourosel ? (
          <motion.img
            key="productImage"
            alt={'DesiCartIconForLoading'}
            className="product-listing-newcard-image"
            src={products?.[0]?.imgLink}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
      ) : (
        <motion.div
          key="productCarousel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="product-card-courosel-main-container"
        >
          <ProductCarousel />
        </motion.div>
      )}
      <motion.div
        className={`product-newCard-content ${openCourosel ? "hovered" : ""}`}
        transition={{ duration: 0.5 }}
      >
        <h3 className="product-cardBrand">PUMA</h3>
        <p style={hoveredTextColor}>Men Black Tshirt</p>
        <div className="product-card-price-breakdown" style={hoveredTextColor}>
          <p className="actual-price" style={hoveredTextColor}>
            Rs. 899
          </p>
          <p className="mrp-price" style={hoveredTextColor}>
            Rs. 1599
          </p>
          <p className="discount" style={hoveredTextColor}>
            (45% off)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductListingNewCard;
