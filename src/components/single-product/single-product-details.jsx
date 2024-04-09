import React from "react";
import { AddToBag, FreeDelivery, GreenTick, PayOnDelivery, ReturnDelivery, StarLogo, Wishlist } from "../../assets/icons";
import { products } from "../../assets/pictures/productImageAddress";

const SingleProductDetails = () => {
  return (
    <div className="singleproduct-details-container">
      <div className="singleProduct-details-price-container">
      <h2>U S Polo Assn Men Denver Slim Fit Chinos</h2>
      <p className="singleproduct-details-brandName">U.S. Polo Assn.</p>
      <div className="rating-container">
        <div className="rating-wrapper">
          <span>4.2</span> {' '}
          <span>
            <StarLogo />
          </span>{' '}
          <span>(150 Ratings)</span>
        </div>
        <span className="singleproduct-details-instock">in stock</span>
      </div>
      <div className="price-container">
        <h1>₹1599</h1>
        <div className="mrp-wrapper">
          <span>MRP </span>
          <span>₹2999</span>
        </div>
        <div>(45% OFF)</div>
      </div>
        <span className="allTaxes-text">inclusive of all taxes</span>
      </div>
      <div className="singleProduct-details-size-container">
        <div className="color-container">
          <span className="moreColor-text">MORE COLORS</span>
          <div className="more-color-image-wrapper">
          {products?.map(product=>{
            return (
            <img src={product?.imgLink} alt='product-image' className="more-color-image"/>
            )
})}
          </div>
        </div>
        <div className="size-container">
        <span className="selectSize-text">SELECT SIZE</span>
        <div className="allAvailableSize-wrapper">
          <span className="availableSize selectedSize">30</span>
          <span className="availableSize">30</span>
          <span className="availableSize">30</span>
          <span className="availableSize">30</span>
          <span className="availableSize">30</span>
          <span className="availableSize">30</span>

        </div>
        </div>
        <div className="addToCart-container">
          <div className="addToCart-btn"><AddToBag/>ADD TO BAG</div>
          <div className="wishlist-btn"><Wishlist/>WISHLIST</div>
        </div>
      </div>
      <div className="singleProduct-details-deliveryOption-container">
        <div className="deliveryOption-text">DELIVERY OPTIONS</div>
        <div className="changePincode-wrapper">
          <span>700018 <GreenTick height='20' width='20'/></span>
          <span>CHANGE</span>
        </div>
        <div className="deliveryOption-wrapper">
          <FreeDelivery/>
          <span>Get it by Wed, Apr 10</span>
        </div>
        <div className="deliveryOption-wrapper">
          <PayOnDelivery/>
          <span>Pay on delivery available</span>
        </div>
        <div className="deliveryOption-wrapper">
          <ReturnDelivery/>
          <span>Easy 14 days return & exchange available</span>
        </div>
        <div className="deliveryOption-originalProduct">100% Original Products</div>
      </div>
      
    </div>
  );
};

export default SingleProductDetails;
