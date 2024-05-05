import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import tags from '../metaTag/dynamicTags';
import SingleProductPage from './Single-product-page';
import useBreakpoints from '../api/utilities/responsive';
import { mensTitleImageDesktop, mensTitleImageMobile, womensTitleImageDesktop, womensTitleImageMobile } from '../assets/pictures/homePage/TitleImages';
import BrandSection from '../components/home/BrandSection';
import getCategoriesProductThunk from '../api/asyncThunk/product-thunk/getCategories-thunk';
import CategorySection from '../components/home/CategorySection';
const Home = () => {
    const user =useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const {isMobile} = useBreakpoints();
    const { getBrand, getCategory } = getCategoriesProductThunk;
    const {
      isLoggedIn,
      loggedInUserName,
    } = user;

    useEffect(()=>{
      dispatch(getBrand());
      dispatch(getCategory());
    },[]);



  return (
   <div className='global-margin'>
    {tags.HomeTag()}
    <div className='homepage-main-container'>
      <div className='homepage-titleImages-container'>
      {isMobile ?
      <div className="homePage-titleImages-mobile-wrapper">
      <Link to={mensTitleImageMobile.navigationLink}>
      <img src={mensTitleImageMobile.src} alt={mensTitleImageMobile.alt}/>
      </Link>
      <Link to={womensTitleImageMobile.navigationLink}>
      <img src={womensTitleImageMobile.src} alt={womensTitleImageMobile.alt}/>
      </Link>
    </div> :
      <div className="homePage-titleImages-desktop-wrapper">
        <Link to={mensTitleImageDesktop.navigationLink}>
        <img src={mensTitleImageDesktop.src} alt={mensTitleImageDesktop.alt}/>
        </Link>
        <Link to={womensTitleImageDesktop.navigationLink}>
        <img src={womensTitleImageDesktop.src} alt={womensTitleImageDesktop.alt}/>
        </Link>
      </div>
    }
      </div>
    <div className='homePage-backgroundStyle'></div>
      <BrandSection/>
      <CategorySection />
    </div>
   </div>
  )
}

export default Home