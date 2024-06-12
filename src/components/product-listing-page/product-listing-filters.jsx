import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import StickyBox from "react-sticky-box";

const ProductListingFilter = (props) => {
  const { productsFilter, filterLoading } = props;

  // Initialize all dropdowns as open
  const [dropdowns, setDropdowns] = useState({
    masterCategory: true,
    category: true,
    brand: true,
    colour: true,
    size: true,
    discountPercentage: true,
    priceRange: true,
  });

  const handleDropdownClick = (name) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return filterLoading ? (
    <div className="product-filter-container">
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
    </div>
  ) : (
    <StickyBox className="product-filter-container" offsetTop={80}>
      {productsFilter && (
        <>
          {productsFilter.masterCategories?.length > 0 && (
            <Dropdown
              name="masterCategory"
              title="Master Category"
              items={productsFilter.masterCategories}
              isOpen={dropdowns.masterCategory}
              handleDropdownClick={handleDropdownClick}
            />
          )}
          {productsFilter.categories?.length > 0 && (
            <Dropdown
              name="category"
              title="Category"
              items={productsFilter.categories}
              isOpen={dropdowns.category}
              handleDropdownClick={handleDropdownClick}
            />
          )}
          {productsFilter.brands?.length > 0 && (
            <Dropdown
              name="brand"
              title="Brand"
              items={productsFilter.brands}
              isOpen={dropdowns.brand}
              handleDropdownClick={handleDropdownClick}
            />
          )}
          {productsFilter.colours?.length > 0 && (
            <Dropdown
              name="colour"
              title="Colour"
              items={productsFilter.colours}
              isOpen={dropdowns.colour}
              handleDropdownClick={handleDropdownClick}
              renderItems={(colours) =>
                colours.map((colour, index) => (
                  <li key={index}>
                    <span
                      style={{
                        backgroundColor: colour.hexCode,
                        width: "20px",
                        height: "20px",
                        display: "inline-block",
                        marginRight: "8px",
                      }}
                    ></span>
                    {colour.colour}
                  </li>
                ))
              }
            />
          )}
          {productsFilter.sizes?.length > 0 && (
            <Dropdown
              name="size"
              title="Size"
              items={productsFilter.sizes}
              isOpen={dropdowns.size}
              handleDropdownClick={handleDropdownClick}
            />
          )}
          {productsFilter.discountPercentages?.length > 0 && (
            <Dropdown
              name="discountPercentage"
              title="Discount Percentage"
              items={productsFilter.discountPercentages}
              isOpen={dropdowns.discountPercentage}
              handleDropdownClick={handleDropdownClick}
              renderItems={(discounts) =>
                discounts.map((discount, index) => (
                  <li key={index}>{discount.discountPercentageText}</li>
                ))
              }
            />
          )}
          <Dropdown
            name="priceRange"
            title="Price Range"
            items={[]}
            isOpen={dropdowns.priceRange}
            handleDropdownClick={handleDropdownClick}
            renderItems={() => (
              <div>
                <p>Min Price: {productsFilter.minPrice}</p>
                <p>Max Price: {productsFilter.maxPrice}</p>
              </div>
            )}
          />
        </>
      )}
    </StickyBox>
  );
};

const Dropdown = ({ name, title, items, isOpen, handleDropdownClick, renderItems }) => (
  <div className="filter-dropdown-wrapper">
    <div className="filter-dropdown-collaps" onClick={() => handleDropdownClick(name)}>
      <span>{title}</span>
      <span className={`filterDropdownArrow${isOpen ? '--open' : ''}`}>
        <FaChevronDown />
      </span>
    </div>
    {isOpen && (
      <ul className="filter-dropdown-expand">
        {renderItems ? renderItems(items) : items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    )}
  </div>
);

export default ProductListingFilter;
