import React, { useEffect, useRef, useState } from "react";
import { AddToBag, FreeDelivery, GreenTick, PayOnDelivery, ReturnDelivery, StarLogo, Wishlist } from "../../assets/icons";
import { products } from "../../assets/pictures/productImageAddress";
import SingleProductSize from "./single-product-size";
import ProductMoreolors from "./product-more-colors";
import { CiHeart } from "react-icons/ci";
import { BsCartCheck } from "react-icons/bs";
import StickyBox from "react-sticky-box";

const SingleProductDetails = (props) => {
  const {
    dispatch,
    isMobile,
    productDetails,
    styleId,
  } = props;

  const productSize = productDetails?.sizes;

  return (
    <div className="singleproduct-details-container">
      <div className="singleProduct-details-price-container">
        <div className="singleProductName-wrapper">
          <p className="singleproduct-details-brandName">{productDetails?.brand?.brandName}</p>
          <p className="singleProduct-product-name">{productDetails?.styleName}</p>
        </div>
        { !isMobile &&
        <div className="rating-container">
          <div className="rating-wrapper">
            <span>{productDetails?.productAvgRating}</span>
            <span>
              <StarLogo />
            </span>
            {productDetails?.reviewCount && <span>{productDetails?.reviewCount} review</span>}
          </div>
          {productDetails?.inStock && <span className="singleproduct-details-instock">in stock</span>}
        </div>}
        <div className="price-container">
          <h3>₹{productDetails?.finalPrice}</h3>
          {productDetails?.mrp > 0 &&
            <div className="mrp-wrapper">
              <span>MRP </span>
              <span>₹{productDetails?.mrp}</span>
            </div>
          }
          {productDetails?.discountPercentage &&
            <div>{productDetails?.discountPercentageText}</div>
          }
        </div>
        <span className="allTaxes-text">inclusive of all taxes</span>
      </div>
      <div className="singleProduct-details-size-container">
        <SingleProductSize
          dispatch={dispatch}
          productSize={productSize}
        />
        <ProductMoreolors
          dispatch={dispatch}
          styleId={styleId}
        />
        {!isMobile &&
          <div className="addToCart-container">
            <div className="addToCart-btn"><BsCartCheck />ADD TO BAG</div>
          </div>}
      </div>
      {isMobile &&
        <div
          className={`mobile-btn-container`}
        >
          <div className="wishlist-btn"><CiHeart size={20}/> WISHLIST</div>
          <div className="addToCart-btn"><BsCartCheck size={20}/>ADD TO BAG</div>
        </div>
      }
      <div className="singleProduct-details-deliveryOption-container">
        <div className="deliveryOption-text">DELIVERY OPTIONS</div>
        <div className="changePincode-wrapper">
          <span>700018 <GreenTick height='20' width='20' /></span>
          <span>CHANGE</span>
        </div>
        <div className="deliveryOption-wrapper">
          <FreeDelivery />
          <span>Get it by Wed, Apr 10</span>
        </div>
        <div className="deliveryOption-wrapper">
          <PayOnDelivery />
          <span>Pay on delivery available</span>
        </div>
        <div className="deliveryOption-wrapper">
          <ReturnDelivery />
          <span>Easy 14 days return & exchange available</span>
        </div>
        <div className="deliveryOption-originalProduct">100% Original Products</div>
      </div>

    </div>
  );
};

export default SingleProductDetails;
