import React, { useEffect, useState } from 'react';
import { products } from '../../assets/pictures/productImageAddress';
import { objectToArrayConverter } from '../../api/utilities/helper';
import StickyBox from 'react-sticky-box';
import { CiHeart } from "react-icons/ci";
import { BsShareFill } from "react-icons/bs";
import SocialShare from '../../small-components/SocialShare';
import Skeleton from 'react-loading-skeleton';
import { LoadingSkeleton } from '../../small-components/LoadingSkeleton';

const ProductImage = ({productImages, productWithStyleId, productStyleLoading}) => {

  const [singleImage, setSingleImage] = useState('');
  const [openShareModal, setOpenShareModal] = useState(false);

  const shareUrl = window.location.href;
  const imageArray = productImages ? objectToArrayConverter(productImages) : [];
  useEffect(() => {
    if(productStyleLoading) {
      setSingleImage('');
    }
    if (!singleImage && !productStyleLoading) {
      setSingleImage(imageArray?.[0]);
    }
  }, [imageArray, singleImage, productStyleLoading]);

  const handleClickImage = (image) => {
    setSingleImage(image);
  };
  const onCloseShare = () => {
    setOpenShareModal(false)
  }
  return (
    <div className='productImage-main-container'>
      {openShareModal && <SocialShare onClose={onCloseShare} shareUrl={shareUrl}/>}
      <StickyBox offsetTop={130}>
      <div className='productImage-singleImage-container'>
      <div className='productImage-singleImage-wrapper'>
        { productStyleLoading ? 
        Array.from({ length: 4 }).map((_, index) => (
            <div className='productImage-singleImage-loading'>
              <LoadingSkeleton width="100%" height="100%" />
              </div>)) : 
        imageArray?.map((productImage, index) => (
          <div className="productImage-singleImage">
            <img
              key={index}
              src={productImage}
              alt='product'
              onClick={() => handleClickImage(productImage)}
            />
          </div>
        ))}
      </div>
      <div className="single-big-image-wrapper">
        {productStyleLoading ? <LoadingSkeleton width="350px" height="450px" /> : <img src={singleImage} alt='single image'/>}
        <div className='product-icon wishlist'><CiHeart size={30}/></div>
        <div className='product-icon share' onClick={()=>setOpenShareModal(true)}><BsShareFill /></div>
      </div>
      </div>
    </StickyBox>
    </div>
  );
};

export default ProductImage;
 