import React, { useEffect } from 'react'
import Popup from '../../small-components/Popup';
import { resetSearchedProduct } from '../../redux/Slices/product/productSlice';

const ProductListingMobileSortBy = ({
    setOpenSortByModal,
    dispatch,
    loading,
    sortBy,
    setSortBy,
}) => {
    const handleOptionClick = (option) => {
        dispatch(resetSearchedProduct());
        setSortBy(option);
        setOpenSortByModal(false)
      };
// useEffect(()=>{
//     if (sortBy === )
// });
  const options = ['Popularity', 'Price: Low to High', 'Price: High to Low'];
    console.log(sortBy, 'sort');
  return (
    <Popup 
    onClose={()=>setOpenSortByModal(false)}
    title= 'Sort By'
    >
        <div className='mobile-sortby-main-container'>
         {options.map((opt, index) => (
              <div 
              className={`sortBy-option ${sortBy===opt && 'selected-option'}`}
              key={index} 
              onClick={() => handleOptionClick(opt)}
              >
                {opt}
              </div>
            ))}
        </div>
    </Popup>
  )
}

export default ProductListingMobileSortBy;
