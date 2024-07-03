import React, { useState, useEffect } from "react";
import classNames from "classnames";
import useBreakpoints from "../api/utilities/responsive";

const ReactSwiper = ({
  children,
  className,
  autoplay = true,
  autoplayDelay = 2000,
  loop = true,
  pagination = false,
  navigation = false,
  space = 10, // Space between cards
  responsiveSpace = [], // Responsive space between cards
  slidesPerView = 1, // Default slides per view
  responsiveSlidesPerView = [], // Responsive slides per view
  effect = "slide", // Default effect: slide, fade, cube, coverflow, flip
}) => {
  const breakpoints = useBreakpoints();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSpace, setCurrentSpace] = useState(space);
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(slidesPerView);
  const [currentEffect, setCurrentEffect] = useState(effect);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (autoplay && React.Children.count(children) > 1 && !isHovered) {
      interval = setInterval(goToNextSlide, autoplayDelay);
    }
    return () => clearInterval(interval);
  }, [currentIndex, autoplay, autoplayDelay, children, isHovered]);

  useEffect(() => {
    const updateSpace = () => {
      const matchedSpace = responsiveSpace.find(
        (config) => breakpoints[config.breakpoint]
      );
      setCurrentSpace(matchedSpace ? matchedSpace.space : space);
    };

    updateSpace();
  }, [breakpoints, space, responsiveSpace]);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const matchedSlidesPerView = responsiveSlidesPerView.find(
        (config) => breakpoints[config.breakpoint]
      );
      setCurrentSlidesPerView(matchedSlidesPerView ? matchedSlidesPerView.slidesPerView : slidesPerView);
    };

    updateSlidesPerView();
  }, [breakpoints, slidesPerView, responsiveSlidesPerView]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % React.Children.count(children));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={classNames("react-swiper", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={classNames("swiper-wrapper", {
          "fade": currentEffect === "fade",
          "cube": currentEffect === "cube",
          "coverflow": currentEffect === "coverflow",
          "flip": currentEffect === "flip",
        })}
        style={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${currentIndex * (100 / currentSlidesPerView)}%)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="swiper-slide"
            style={{
              marginRight: `${currentSpace}px`,
              width: `calc(${100 / currentSlidesPerView}% - ${currentSpace}px)`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
      {pagination && (
        <div className="pagination">
          {React.Children.map(children, (child, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={index === currentIndex ? "bullet active" : "bullet"}
            />
          ))}
        </div>
      )}
      {navigation && (
        <div className="navigation">
          <button onClick={goToPrevSlide} className="prev-btn" disabled={!loop && currentIndex === 0}>
            Prev
          </button>
          <button onClick={goToNextSlide} className="next-btn" disabled={!loop && currentIndex === React.Children.count(children) - 1}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReactSwiper;
