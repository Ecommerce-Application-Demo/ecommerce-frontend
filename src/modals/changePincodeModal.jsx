import React, { useEffect, useState, useCallback } from 'react';
import Modal from '../small-components/Modal-global';
import Popup from '../small-components/Popup';
import { SiTicktick } from "react-icons/si";
import useBreakpoints from '../api/utilities/responsive';
import { addAddressForDeliveryOption } from '../redux/Slices/product/singleProductSlice';
import singleProductThunk from '../api/asyncThunk/product-thunk/singleProductThunk';
import { useSelector } from 'react-redux';

const ChangePincodeModal = ({
  addresses,
  addressForDeliveryOption,
  dispatch,
  setChangePincodeModal,
}) => {
  const sizeForDeliveryOption = useSelector((state) => state.product.sizeForDeliveryOption);
  const { isMobile } = useBreakpoints();
  const [pincodeText, setPincodeText] = useState('');

  const onClose = useCallback(() => {
    setChangePincodeModal(false);
  }, [setChangePincodeModal]);

  const clickCheck = useCallback(() => {
    if (pincodeText?.length === 6) {
      const addressData = {
        name: null,
        pincode: pincodeText,
        addId: null,
      };
      console.log(addressData, 'data');
      const checkDeliveryData = {
        skuId: sizeForDeliveryOption,
        pincode: pincodeText,
      };
      dispatch(singleProductThunk.checkDelivery(checkDeliveryData))
        .unwrap()
        .then(() => {
          dispatch(addAddressForDeliveryOption(addressData));
          onClose();
        });
    }
  }, [pincodeText, sizeForDeliveryOption, dispatch, onClose]);

  const handleClickAddress = useCallback((address) => {
    const addressData = {
      name: address?.name,
      pincode: address?.pincode,
      addId: address?.addId,
    };
    const checkDeliveryData = {
      skuId: sizeForDeliveryOption,
      pincode: address?.pincode,
    };
    dispatch(singleProductThunk.checkDelivery(checkDeliveryData))
      .unwrap()
      .then(() => {
        dispatch(addAddressForDeliveryOption(addressData));
        onClose();
      });
  }, [sizeForDeliveryOption, dispatch, onClose]);
  console.log('hii');
  const AddressContent = () => (
    <div className='changePincodeModal-container'>
      <div className='custompincode-wrapper'>
        <input
          placeholder='Enter your pincode'
          onChange={(e) => setPincodeText(e.target.value)}
          value={pincodeText}
          autoFocus
          type='number'
        />
        <span onClick={clickCheck}>CHECK</span>
      </div>
      <div className='or-wrapper'>
        <div className='divider--horizontal' />
        <span>OR</span>
        <div className='divider--horizontal' />
      </div>
      <h2 className='selectAddress-text'>Select a saved address to check delivery info</h2>
      <div className='allAddresses-wrapper'>
        {addresses?.map((address) => (
          <div
            className={`addressCardPincode-wrapper ${addressForDeliveryOption?.addId === address?.addId ? 'selectedAddress' : null}`}
            key={address?.addId}
            onClick={() => handleClickAddress(address)}
          >
            <div className='addressCardPincode-leftside'>
              <div className='addressCardPincodeLeft-nameWrap'>
                <p>{address?.name}, {address?.pincode}</p>
                <p className='addressType'>{address?.addressType}</p>
              </div>
              <p className='addressLine'>{address?.addressLine1}</p>
            </div>
            <div className={`addressCardPincode-rightside${addressForDeliveryOption?.addId === address?.addId ? '--selected' : '--notSelected'}`}>
              <SiTicktick size={25} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    !isMobile ? (
      <Modal
        height='600px'
        width='600px'
        heightForMobile='fit-content'
        widthForMobile='100vw'
        onClose={onClose}
        title='Use pincode to check delivery info'
      >
        <AddressContent />
      </Modal>
    ) : (
      <Popup
        onClose={onClose}
        title='Use pincode to check delivery info'
        titleClassName='changepincodepopuptitle'
      >
        <AddressContent />
      </Popup>
    )
  );
};

export default ChangePincodeModal;
