import React from 'react';
import { RxCross2 } from "react-icons/rx";

const ProductListingEditFilter = ({ selectedItems, setSelectedItems, handleClearAll }) => {
  const filterEntries = Object.entries(selectedItems);
  const handleDeselect = (filterName, value) => {
    setSelectedItems(prevItems => ({
      ...prevItems,
      [filterName]: prevItems[filterName].filter(item => item !== value)
    }));
  };
  return (
    <>
      <div className="product-listing-editFilter-container">
        <div className='editFilter-leftside'>
          <p className='filterText'>Filter</p>
          <p onClick={handleClearAll} className='clearAllText'>Clear All</p>
        </div>
        <div className='editFilter-rightside'>
          {filterEntries.map(([filterName, filterValues]) => (
            filterValues.length > 0 && (
              <div key={filterName} className="filter-group">
                {filterValues.map((value, index) => (
                  <div key={index} className="filter-item">
                    <span>{value}</span>
                    <button onClick={() => handleDeselect(filterName, value)}><RxCross2 /></button>
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      </div>
      <div className="divider--horizontal" />
    </>
  );
};

export default ProductListingEditFilter;
