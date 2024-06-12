import React, { useEffect, useState } from 'react';
import { products } from '../../assets/pictures/productImageAddress';
import { objectToArrayConverter } from '../../api/utilities/helper';
import StickyBox from 'react-sticky-box';
import { CiHeart } from "react-icons/ci";
import { BsShareFill } from "react-icons/bs";

const ProductImage = ({productImages}) => {

  const [singleImage, setSingleImage] = useState('');

  const imageArray = productImages ? objectToArrayConverter(productImages) : [];
  useEffect(() => {
    if (!singleImage) {
      setSingleImage(imageArray?.[0]);
    }
  }, [imageArray, singleImage]);

  const handleClickImage = (image) => {
    setSingleImage(image);
  };

  return (
    <div>
      <StickyBox offsetTop={130}>
      <div className='productImage-singleImage-container'>
      <div className='productImage-singleImage-wrapper'>
        {imageArray?.map((productImage, index) => (
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
        <img src={singleImage} alt='single image'/>
        <div className='product-icon wishlist'><CiHeart size={30}/></div>
        <div className='product-icon share'><BsShareFill /></div>
      </div>
      </div>
    </StickyBox>
    </div>
  );
};

export default ProductImage;
 