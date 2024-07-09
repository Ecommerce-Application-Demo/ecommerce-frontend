import React, { useEffect, useState } from "react";
import StickyBox from "react-sticky-box";
import Dropdown from "../../small-components/filter-dropdown";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const ProductListingFilter = (props) => {
  const { productsFilter, filterLoading, selectedItems, setSelectedItems, priceRange, setPriceRange, setLatestChangingKey } = props;

  // Initialize all dropdowns as open
  const [dropdowns, setDropdowns] = useState({
    masterCategories: true,
    categories: true,
    brands: true,
    colours: true,
    sizes: true,
    discountPercentages: true,
    priceRanges: true,
  });

  const handleSliderChange = (value, newValue) => {
    console.log(newValue, 'new ');
    if (newValue && newValue.length === 2) {
      setPriceRange({
        minPrice: newValue[0],
        maxPrice: newValue[1]
      });
    }
  };

  const handleDropdownClick = (name) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  useEffect(() => {
    if (productsFilter) {
      const minPrice = productsFilter.minPrice;
      const maxPrice = productsFilter.maxPrice;
      if (minPrice !== priceRange.minPrice || maxPrice !== priceRange.maxPrice) {
        setPriceRange({
          ...priceRange,
          minPrice,
          maxPrice
        });
      }
    }
  }, [productsFilter]);

  const isLastItemDeselected = (type, item) => {
    const currentArray = selectedItems[type];
    const isItemPresent = currentArray.includes(item);

    if (isItemPresent) {
      // If the item is present, it means we are about to deselect it
      // Create a new array without the item to check if it's the last item
      const newArray = currentArray.filter((i) => i !== item);
      return newArray.length === 0; // Check if the array is empty after removal
    }

    // If the item is not present, it was never selected
    return false;
  };

  const handleItemClick = (name, item) => {
    setSelectedItems((prevItems) => {
      if (name === 'discountPercentage') {
        return {
          ...prevItems,
          [name]: prevItems[name] === item ? null : item, 
        };
      } else {
        const updatedItems = prevItems[name] ? [...prevItems[name]] : [];
        const itemIndex = updatedItems.indexOf(item);
        if (itemIndex === -1) {
          updatedItems.push(item);
        } else {
          updatedItems.splice(itemIndex, 1);
        }
        return {
          ...prevItems,
          [name]: updatedItems,
        };
      }
    });
    isLastItemDeselected(name, item);
    setLatestChangingKey(name);
  };
  
  return filterLoading ? (
    <div className="product-filter-container">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="filter-dropdown-loading"></div>
      ))}
    </div>
  ) : (
    <StickyBox className="product-filter-container" offsetTop={80}>
      {productsFilter && (
        <>
          {productsFilter.masterCategories?.length > 0 && (
            <Dropdown
              name="masterCategories"
              title="Master Categories"
              items={productsFilter.masterCategories}
              isOpen={dropdowns.masterCategories}
              handleDropdownClick={handleDropdownClick}
              handleItemClick={handleItemClick}
              selectedItems={selectedItems}
            />
          )}
          {productsFilter.categories?.length > 0 && (
            <Dropdown
              name="categories"
              title="Categories"
              items={productsFilter.categories}
              isOpen={dropdowns.categories}
              handleDropdownClick={handleDropdownClick}
              handleItemClick={handleItemClick}
              selectedItems={selectedItems}
            />
          )}
          {productsFilter.brands?.length > 0 && (
            <Dropdown
              name="brands"
              title="Brands"
              items={productsFilter.brands}
              isOpen={dropdowns.brands}
              handleDropdownClick={handleDropdownClick}
              handleItemClick={handleItemClick}
              selectedItems={selectedItems}
            />
          )}
          {productsFilter.colours?.length > 0 && (
            <Dropdown
              name="colours"
              title="Colours"
              items={productsFilter.colours}
              isOpen={dropdowns.colours}
              handleDropdownClick={handleDropdownClick}
              handleItemClick={handleItemClick}
              selectedItems={selectedItems}
              renderItems={(colours) =>
                colours.map((colour, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        name="colours"
                        value={colour.colour}
                        checked={selectedItems.colours?.includes(colour.colour)}
                        onChange={() => handleItemClick('colours', colour.colour)}
                      />
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
                    </label>
                  </li>
                ))
              }
            />
          )}
          {productsFilter.sizes?.length > 0 && (
            <Dropdown
              name="sizes"
              title="Sizes"
              items={productsFilter.sizes}
              isOpen={dropdowns.sizes}
              handleDropdownClick={handleDropdownClick}
              handleItemClick={handleItemClick}
              selectedItems={selectedItems}
            />
          )}
          {productsFilter.discountPercentages?.length > 0 && (
            <Dropdown
              name="discountPercentages"
              title="Discount Percentages"
              items={productsFilter.discountPercentages}
              isOpen={dropdowns.discountPercentages}
              handleDropdownClick={handleDropdownClick}
              handleItemClick={handleItemClick}
              selectedItems={selectedItems}
              renderItems={(discounts) =>
                discounts.map((discount, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        name="discountPercentage"
                        value={discount.discountPercentageText}
                        checked={selectedItems.discountPercentage === discount.discountPercentage}
                        onChange={() => handleItemClick('discountPercentage', discount.discountPercentage)}
                      />
                      {discount.discountPercentageText}
                    </label>
                  </li>
                ))
              }
            />
          )}
          {/* <div> */}
            {/* <RangeSlider
              min={productsFilter?.minPrice || 0}
              max={productsFilter?.maxPrice || 1000} // Adjust this default max price
              defaultValue={[priceRange.minPrice, priceRange.maxPrice]}
              onRangeDragEnd={handleSliderChange}
            /> */}
            {/* <input
                type="range"
                min={productsFilter?.minPrice}
                max={productsFilter?.maxPrice}
                value={[priceRange?.minPrice, priceRange?.maxPrice]}
                onChange={handleSliderChange}
                step="1"
            />
            <p>Selected range: {priceRange?.minPrice} - {priceRange?.maxPrice}</p>
          </div> */}
        </>
      )}
    </StickyBox>
  );
};

export default ProductListingFilter;
