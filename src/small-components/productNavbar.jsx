import React, { useEffect, useState } from 'react'
import { CiShare2 } from "react-icons/ci";
import ThemeToggle from './ThemeToggle';
import { IoBagHandleOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ProductNavbar = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const navigate = useNavigate();
    const [opacity, setOpacity] = useState(0);
    const handleScrollNav = () => {
        const scrolled = document.documentElement.scrollTop;
        const newOpacity = Math.min(1, 0 + (scrolled / 20) * 0.05);
        setOpacity(newOpacity);
      };

    useEffect(()=> {
        window.addEventListener('scroll', handleScrollNav);
        return(()=>window.removeEventListener('scroll', handleScrollNav));
    },[]);
    console.log(window.history);
    const handleBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
          } else {
            navigate('/');
          }      };
    const backgroundNav = {
        background: !isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
        boxShadow: opacity > 0.80 ? `var(--product-card-box-shadow)` : '',
    }
  return (
    <nav className='productNav-container' style={backgroundNav}>
      <div className='productNav-left' onClick={handleBack}><MdChevronLeft size={24}/></div>
      <div className='productNav-right'>
        <div><CiShare2 size={24}/></div>
        <div><CiHeart size={24}/></div>
        <div><IoBagHandleOutline size={24}/></div>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default ProductNavbar;
