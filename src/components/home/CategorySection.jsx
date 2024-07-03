import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const CategorySection = () => {
  const { categoryDetails } = useSelector((state) => state.getProductCategory);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseOverCard = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeaveCard = () => {
    setHoveredCard(null);
  };

  return (
    <div className="CategorySection-main-container">
      <h3 className="ourBrands-text">SHOP BY CATEGORY</h3>
      <div className="categorySection-cards-wrapper">
        {categoryDetails?.map((category, index) => {
          const isHovered = hoveredCard === index;

          return (
            <div
              key={index}
              className="categorySection-card"
              onMouseOver={() => handleMouseOverCard(index)}
              onMouseLeave={handleMouseLeaveCard}
            >
              <img
                src={category?.categoryDefaultImage}
                alt={category?.categoryDescription}
                className="categorySection-card-image"
              />
              <p className="categorySection-card-titleText">
                {category?.categoryName?.toUpperCase()}
              </p>
              {isHovered && (
                <motion.p
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className="categorySection-card-Description"
                >
                  {category?.categoryDescription}
                </motion.p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
