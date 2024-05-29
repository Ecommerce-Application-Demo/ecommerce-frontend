import React, { useState } from "react";
import { products } from "../../assets/pictures/productImageAddress";
import { StarLogo, Wishlist } from "../../assets/icons";
import { isColorLight } from "../../uiHelper/uiHelper";
import { motion } from "framer-motion";
import ProductCarousel from "./product-listing-courosel";

const ProductLisitngSingleCard = (props) => {
  const {color} = props;
  const [openCourosel, setOpenCourosel] = useState(false);

  return (
    <motion.div
      className="product-listing-card-wraper"
      onHoverStart={() => setOpenCourosel(true)}
      onHoverEnd={() => setOpenCourosel(false)}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {!openCourosel ? (
        <motion.img
          alt="images"
          className="product-listing-card-images"
          src={products?.[0]?.imgLink}
          initial={{ opacity: 1 }}
          animate={{ opacity: openCourosel ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      ) : 
      <ProductCarousel />
      }
      <div className="product-listing-wishlist-icon">
        <Wishlist stroke="#f67070" />
      </div>
      <p className={openCourosel ? 'brandName' : 'brandName-hover'}>PUMA</p>
      <div className="rating-wrapper">
        4.5 &nbsp;
        <StarLogo color="white" size={12} />
        &nbsp; |&nbsp; 12
      </div>
      <div className="product-card-content" style={{ background: color }}>
        <p>Men Black tshirt</p>
      </div>
      <div className="product-card-price-breakdown">
        <p className="actual-price">Rs. 899</p>
        <p className="mrp-price">Rs. 1599</p>
        <p className="discount">(45% off)</p>
      </div>
    </motion.div>
  );
};

export default ProductLisitngSingleCard;
