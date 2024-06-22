import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductCarousel from "./product-listing-courosel";
import {
  convertDiscountText,
  convertStringToRupees,
  createOverlay,
  isColorLight,
} from "../../uiHelper/uiHelper";
import { DesiCartIconForLoading, StarLogo } from "../../assets/icons";
import { useNavigate } from "react-router";

const ProductListingNewCard = ({ 
  product,
  isMobile,
  isSmallMobile,
 }) => {
  const navigate = useNavigate();
  const [openCourosel, setOpenCourosel] = useState(false);
  const hoveredTextColor = {
    color: openCourosel && !isSmallMobile ? isColorLight(product?.colourHexCode) ? "black" : "white" : "",
  };
  const handleClick = () => {
    console.log(product, "selected product");
    navigate(`/product/${product?.styleName}/${product?.styleId}/buy`,);
  };
  return (
    <motion.div
      className="product-new-card-container"
      onHoverStart={() => setOpenCourosel(true)}
      onHoverEnd={() => setOpenCourosel(false)}
      initial={{ scale: 1 }}
      whileHover={{ scale: isMobile ? 1.00 : 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ "--card-color": createOverlay(product?.colourHexCode) }}
      onClick={handleClick}
    >
      {product?.productAvgRating>0 && (
        <div className="rating-wrapper">
          {product?.productAvgRating} &nbsp;
          <StarLogo color="var(--primary-btn-red)" size={12} />
          {product?.reviewCount>0 && <>&nbsp; |&nbsp; {product?.reviewCount}</>}
        </div>
      )}
      {!openCourosel || isSmallMobile ? (
        <motion.img
          key="productImage"
          alt={"DesiCartIconForLoading"}
          className="product-listing-newcard-image"
          src={product?.defaultImage || <DesiCartIconForLoading />}
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
          <ProductCarousel images={product?.images} />
        </motion.div>
      )}
      <motion.div
        className={`product-newCard-content ${openCourosel && !isSmallMobile ? "hovered" : ""}`}
        transition={{ duration: 0.5 }}
      >
        <h3 className="product-cardBrand">{product?.brandName}</h3>
        <p style={hoveredTextColor}>{product?.styleName}</p>
        <div className="product-card-price-breakdown" style={hoveredTextColor}>
          <p className="actual-price" style={hoveredTextColor}>
            {convertStringToRupees(product?.finalPrice)}
          </p>
          <p className="mrp-price" style={hoveredTextColor}>
            {convertStringToRupees(product?.mrp)}
          </p>
          <p className="discount" style={hoveredTextColor}>
            {convertDiscountText(product?.discountPercentage)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductListingNewCard;
