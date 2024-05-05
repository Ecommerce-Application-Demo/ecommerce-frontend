import React from "react";
import ReactSwiper from "../../small-components/ReactSwiper";
import { useSelector } from "react-redux";
import useBreakpoints from "../../api/utilities/responsive";
const BrandSection = () => {
  const { brandDetails } = useSelector((state) => state.getProductCategory);
  const { isMobile } = useBreakpoints();
  return (
    <div className="brandSection-main-container">
      <h3 className="ourBrands-text">OUR BRANDS</h3>
      <div className="homePage-category-section">
        <ReactSwiper
          autoplay={true}
          pagination={true}
          // navigation={true}
          // responsiveSpace={[
          //   { breakpoint: "isDesktopOrLaptop", space: 0 },
          //   { breakpoint: "isTablet", space: 20 },
          //   { breakpoint: "isMobile", space: 10 },
          // ]}
          slidesPerView={3} // Default slides per view
          responsiveSlidesPerView={[
            { breakpoint: "isDesktopOrLaptop", slidesPerView: 6 },
            { breakpoint: "isTablet", slidesPerView: 4 },
            { breakpoint: "isMobile", slidesPerView: 3 },
          ]}
          effect="flip"
          className='brandSection-cardSlides-wrapper'
        >
          {brandDetails?.map((brand, index) => (
            <div key={index} className="brandSection-cardSlide">
              <div className="brandSection-cardSlide-image-wrapper">
                <img
                  alt={brand?.brandDescription}
                  src={brand?.brandDefaultImage}
                />
              </div>
              <p className="brandSection-brandName">
                {brand?.brandName || "DesiCart"}
              </p>
            </div>
          ))}
        </ReactSwiper>
      </div>
    </div>
  );
};

export default BrandSection;
