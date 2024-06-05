import React, { useState } from 'react'
import { SearchLogo } from '../assets/icons';
import { useNavigate } from 'react-router-dom';
import { resetSearchedProduct } from '../redux/Slices/product/productSlice';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState('');
  const dispatch = useDispatch();
  const handleSearchBar = (e) => {
    setSearchedText(e.target.value);
  }

  const handleSearchSubmit = (e) =>{
    e.preventDefault();
    dispatch(resetSearchedProduct());
    console.log('reset');
    navigate(`/products?search=${searchedText}`);
  }
  return (
    <form className='navbar-search-container' onSubmit={handleSearchSubmit}>
        <input 
         placeholder='type your fashion'
         value={searchedText}
         onChange={handleSearchBar}
        />
        <div><SearchLogo /></div>
    </form>
  )
}

export default SearchBar;