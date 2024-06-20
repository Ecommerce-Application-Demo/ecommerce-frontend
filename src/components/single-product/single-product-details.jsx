import React from "react";
import { StarLogo } from "../../assets/icons";
import SingleProductSize from "./single-product-size";
import ProductMoreColors from "./product-more-colors";
import { CiHeart } from "react-icons/ci";
import { BsCartCheck } from "react-icons/bs";
import SingleProductDeliveryOptions from "./singleProduct-delivery-options";

const SingleProductDetails = (props) => {
  const {
    dispatch,
    isLoggedIn,
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
        <ProductMoreColors
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
     <SingleProductDeliveryOptions 
      dispatch={ dispatch }
      isLoggedIn={ isLoggedIn }
     />

    </div>
  );
};

export default SingleProductDetails;
