import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { MdDoDisturb } from "react-icons/md";
import { useSelector } from 'react-redux';
import { selectSizeForDeliveryOption } from '../../redux/Slices/product/singleProductSlice';
import singleProductThunk from '../../api/asyncThunk/product-thunk/singleProductThunk';

const SingleProductSize = ({
  dispatch,
  productSize,
}) => {
  const sizeForDeliveryOption = useSelector((state)=>state.product.sizeForDeliveryOption);
  const addressForDeliveryOption = useSelector((state) => state.product.addressForDeliveryOption);

  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const firstAvailableSize = productSize?.find(size => size.quantity > 0);
    if (firstAvailableSize) {
      setSelectedSize(firstAvailableSize?.size);
      dispatch(selectSizeForDeliveryOption(firstAvailableSize?.skuId));
      const checkDeliveryData = {
        skuId: firstAvailableSize?.skuId,
        pincode: addressForDeliveryOption?.pincode,
      }
      dispatch(singleProductThunk.checkDelivery(checkDeliveryData));
    }
  }, [productSize]);

  const handleSelectedSize = (size) => {
    setSelectedSize(size?.size);
    dispatch(selectSizeForDeliveryOption(size?.skuId));
    const checkDeliveryData = {
      skuId: size?.skuId,
      pincode: addressForDeliveryOption?.pincode,
    }
    dispatch(singleProductThunk.checkDelivery(checkDeliveryData));
  };

  return (
    <div className="size-container">
      <span className="selectSize-text">SELECT SIZE</span>
      <div className="allAvailableSize-wrapper">
        {productSize?.map((size) => (
          <div
            key={size.size}
            className={`availableSize ${(!size?.quantity || size?.quantity === 0) ? 'outOfStockSize' : (selectedSize === size?.size) ? 'selectedSize' : 'nonSelectedSize'}`}
            onClick={() => !(!size?.quantity || size?.quantity === 0) && handleSelectedSize(size)}
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
