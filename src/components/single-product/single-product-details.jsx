import React, { useRef, useEffect, useState } from "react";
import { StarLogo } from "../../assets/icons";
import SingleProductSize from "./single-product-size";
import ProductMoreColors from "./product-more-colors";
import { CiHeart } from "react-icons/ci";
import { BsCartCheck } from "react-icons/bs";
import SingleProductDeliveryOptions from "./singleProduct-delivery-options";
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from "react-redux";

const SingleProductDetails = ({
  addressForDeliveryOption,
  dispatch,
  isDeliverable,
  isLoggedIn,
  isMobile,
  productDetails,
  styleId,
}) => {
  //redux state------------
  const isDeliverableData = useSelector((state) => state.product.isDeliverableData);


  const refForExpressDeliveryBanner = useRef();
  const [isExpressDeliveryVisible, setIsExpressDeliveryVisible] = useState(false);
  const productSize = productDetails?.sizes;
  const { lowestDeliveryTime } = isDeliverableData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsExpressDeliveryVisible(!entry.isIntersecting);
      },
      { threshold: 1.0 }
    );

    if (refForExpressDeliveryBanner.current) {
      observer.observe(refForExpressDeliveryBanner.current);
    }

    return () => {
      if (refForExpressDeliveryBanner.current) {
        observer.unobserve(refForExpressDeliveryBanner.current);
      }
    };
  }, []);

  const getExpressDeliveryText = (lowestDeliveryTime) => {
    if (lowestDeliveryTime !== 'Could not Delivery on this pincode.') {
      const deliveryDateStr = lowestDeliveryTime?.match(/(\w{3}, \d{2} \w{3})/)[0]; // Extract date string
      const deliveryDate = new Date(`${deliveryDateStr} ${new Date().getFullYear()}`); // Convert to Date object

      const today = new Date();
      const diffInTime = deliveryDate?.getTime() - today.getTime();
      const diffInDays = Math?.ceil(diffInTime / (1000 * 3600 * 24)); // Convert time difference to days

      if (diffInDays === 0) {
        return "Get it by today";
      } else if (diffInDays === 1) {
        return "Get it by tomorrow";
      } else if (diffInDays > 1 && diffInDays <= 3) {
        return `Get it within ${diffInDays} days`;
      } else {
        return false;
      }
    }
    else {
      return false;
    }
  };

  return (
    <div className="singleproduct-details-container">
      <div className="singleProduct-details-price-container">
        <div className="singleProductName-wrapper">
          <p className="singleproduct-details-brandName">{productDetails?.brand?.brandName}</p>
          <p className="singleProduct-product-name">{productDetails?.styleName}</p>
        </div>
        {!isMobile &&
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
        // refForExpressDeliveryBanner={refForExpressDeliveryBanner}
        />
        {!isMobile &&
          <div className="addToCart-container">
            <div className="addToCart-btn" disabled={!isDeliverable && addressForDeliveryOption?.pincode}><BsCartCheck />ADD TO BAG</div>
          </div>}
      </div>
      <div ref={refForExpressDeliveryBanner} />
      {isMobile &&
        <div
          className={`mobile-stickybottom-container`}
        >
          {(isExpressDeliveryVisible && lowestDeliveryTime && addressForDeliveryOption?.pincode && isDeliverable) &&
            <span className="expressDelivery">
              <TbTruckDelivery />
              <span className="expressText">Express</span>
              <span className="getExpressDeliveryText">{getExpressDeliveryText(lowestDeliveryTime)}</span>
            </span>}
          <div className={`mobile-btn-container`}>
            <div className="wishlist-btn"><CiHeart size={20} /> WISHLIST</div>
            <div className="addToCart-btn" disabled={!isDeliverable && addressForDeliveryOption?.pincode}><BsCartCheck size={20} />ADD TO BAG</div>
          </div>
        </div>
      }
      <SingleProductDeliveryOptions
        dispatch={dispatch}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default SingleProductDetails;
