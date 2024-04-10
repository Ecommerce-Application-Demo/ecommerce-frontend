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
        {/* <ReactImageMagnify
          {...{
            smallImage: {
              alt: 'product',
              isFluidWidth: true,
              src: singleImage,
            },
            largeImage: {
              src: singleImage,
              width: 1200,
              height: 1800, 
            },
            hoverDelayInMs: 100,
            hoverOffDelayInMs: 100,
            lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },

            renderMode: "inPlace", 
            zoomPosition: "lens", 
            // enlargedImageContainerStyle: { display: 'none' }
          }}
        /> */}
        <img src={singleImage} alt='single image'/>
      </div>
    </div>
  );
};

export default ProductImage;
 