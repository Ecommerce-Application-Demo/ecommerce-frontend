import React, { useState } from 'react'
import { SearchLogo } from '../assets/icons';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState('');
  const handleSearchBar = (e) => {
    setSearchedText(e.target.value);
  }

  const handleSearchSubmit = (e) =>{
    e.preventDefault();
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