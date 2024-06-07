import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { resetSearchedProduct } from '../../redux/Slices/product/productSlice';

const ProductListingSortBy = (props) => {
  const { 
    dispatch,
    loading,
    sortBy,
    setSortBy,
   } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    dispatch(resetSearchedProduct());
    setSortBy(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const options = ['Popularity', 'Price: Low to High', 'Price: High to Low'];

  return (
    <div className='product-list-sortBy-container' ref={dropdownRef}>
      {!loading ? <div className='dropdown'>
        <button className={`dropdown-toggle ${isOpen ? 'toggleopen' : ''}`} onClick={toggleDropdown}>
          <span>{sortBy}</span>
          <span className={`arrow-icon ${isOpen ? 'open' : ''}`}>
            <FaChevronDown />
          </span>
        </button>
        {isOpen && (
          <ul className='dropdown-menu'>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div> :
      <div className='dropdown-loading'/>}
    </div>
  );
};

export default ProductListingSortBy;
