import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { MdDoDisturb } from "react-icons/md";

const SingleProductSize = (props) => {
  const { dispatch, productSize } = props;
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const firstAvailableSize = productSize?.find(size => size.quantity > 0);
    if (firstAvailableSize) {
      setSelectedSize(firstAvailableSize.size);
    }
  }, [productSize]);

  const handleSelectedSize = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="size-container">
      <span className="selectSize-text">SELECT SIZE</span>
      <div className="allAvailableSize-wrapper">
        {productSize?.map((size) => (
          <div
            key={size.size}
            className={`availableSize ${(!size?.quantity || size?.quantity === 0) ? 'outOfStockSize' : (selectedSize === size?.size) ? 'selectedSize' : 'nonSelectedSize'}`}
            onClick={() => !(!size?.quantity || size?.quantity === 0) && handleSelectedSize(size.size)}
          >
            {size.size}
            {(!size?.quantity || size?.quantity === 0) && <span className='outOfStockSize-logo'></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProductSize;
