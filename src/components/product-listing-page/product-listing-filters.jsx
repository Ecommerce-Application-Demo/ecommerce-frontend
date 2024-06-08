import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import StickyBox from "react-sticky-box";

const ProductListingFilter = (props) => {
  const { productsFilter, filterLoading } = props;

  const [selectedDropdown, setSelectedDropdown] = useState("");

  const handleDropdownClick = (name) => {
    setSelectedDropdown(name === selectedDropdown ? '' : name);
  };

  return (
    filterLoading ? 
     <div className="product-filter-container">
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>
      <div className="filter-dropdown-loading"></div>

      </div>
      :
    <StickyBox
      className="product-filter-container"
      offsetTop={150}
    >
      {productsFilter && (
        <>
          {productsFilter.masterCategories?.length > 0 && (
            <Dropdown
              name="masterCategory"
              title="Master Category"
              items={productsFilter.masterCategories}
              selectedDropdown={selectedDropdown}
              handleDropdownClick={handleDropdownClick}
            />
          )}
          {productsFilter.categories?.length > 0 && (
            <Dropdown
              name="category"
              title="Category"
              items={productsFilter.categories}
              selectedDropdown={selectedDropdown}
              handleDropdownClick={handleDropdownClick}
            />
          )}
          {productsFilter.brands?.length > 0 && (
            <Dropdown
              name="brand"
              title="Brand"
              items={productsFilter.brands}
              selectedDropdown={selectedDropdown}
              handleDropdownClick={handleDropdownClick}
            />
          )}
          {productsFilter.colours?.length > 0 && (
            <Dropdown
              name="colour"
              title="Colour"
              items={productsFilter.colours}
              selectedDropdown={selectedDropdown}
              handleDropdownClick={handleDropdownClick}
              renderItems={(colours) => colours.map((colour, index) => (
                <li key={index}>
                  <span style={{ backgroundColor: colour.hexCode, width: '20px', height: '20px', display: 'inline-block', marginRight: '8px' }}></span>
                  {colour.colour}
                </li>
              ))}
            />
          )}
          {productsFilter.sizes?.length > 0 && (
            <Dropdown
              name="size"
              title="Size"
              items={productsFilter.sizes}
              selectedDropdown={selectedDropdown}
              handleDropdownClick={handleDropdownClick}
            />
          )}
          {productsFilter.discountPercentages?.length > 0 && (
            <Dropdown
              name="discountPercentage"
              title="Discount Percentage"
              items={productsFilter.discountPercentages}
              selectedDropdown={selectedDropdown}
              handleDropdownClick={handleDropdownClick}
              renderItems={(discounts) => discounts.map((discount, index) => (
                <li key={index}>{discount.discountPercentageText}</li>
              ))}
            />
          )}
          <Dropdown
            name="priceRange"
            title="Price Range"
            items={[]}
            selectedDropdown={selectedDropdown}
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


const Dropdown = ({ name, title, items, selectedDropdown, handleDropdownClick, renderItems }) => (
  <div className="filter-dropdown-wrapper">
    <div
      className="filter-dropdown-collaps"
      onClick={() => handleDropdownClick(name)}
    >
      <span>{title}</span>
      <span className={`filterDropdownArrow${selectedDropdown === name ? '--open' : ''}`}>
        <FaChevronDown />
      </span>
    </div>
    {selectedDropdown === name && (
      <ul className="filter-dropdown-expand">
        {renderItems ? renderItems(items) : items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);
export default ProductListingFilter;
