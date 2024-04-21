import React, { useEffect, useState } from 'react';
import { products } from '../../assets/pictures/productImageAddress';

const ProductImage = () => {
  const [singleImage, setSingleImage] = useState('');

  useEffect(() => {
    setSingleImage(products?.[0]?.imgLink);
  }, []);

  const handleClickImage = (imageLink) => {
    setSingleImage(imageLink);
  };

  return (
    <div className='productImage-singleImage-container'>
      <div className='productImage-singleImage-wrapper'>
        {products?.map((productImage, index) => (
          <div className="productImage-singleImage">
            <img
              key={index}
              src={productImage?.imgLink}
              alt='product'
              onClick={() => handleClickImage(productImage?.imgLink)}
            />
          </div>
        ))}
      </div>
      <div className="single-big-image-wrapper">
        <img src={singleImage} alt='single image'/>
      </div>
    </div>
  );
};

export default ProductImage;
 