import React, { useState } from "react";
import { products } from "../../assets/pictures/productImageAddress";
import { motion } from "framer-motion";
import ProductCarousel from "./product-listing-courosel";

const ProductListingNewCard = ({ color }) => {
  const [openCourosel, setOpenCourosel] = useState(false);

  return (
    <motion.div
      className="product-new-card-container"
      onHoverStart={() => setOpenCourosel(true)}
      onHoverEnd={() => setOpenCourosel(false)}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ '--card-color': color }}
    >
      {!openCourosel ? (
        <motion.img
          key="productImage"
          alt="images"
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
        >
          <ProductCarousel />
        </motion.div>
      )}
      <motion.div
        className={`product-newCard-content ${openCourosel ? 'hovered' : ''}`}
        transition={{ duration: 0.5 }}
      >
<h3 className="product-cardBrand" style={{ background: openCourosel ? '#fff' : color, color: openCourosel ? color : '' }}>PUMA</h3>
        <p>Men Black Tshirt</p>
        <div className="product-card-price-breakdown">
          <p className="actual-price">Rs. 899</p>
          <p className="mrp-price">Rs. 1599</p>
          <p className="discount">(45% off)</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductListingNewCard;
