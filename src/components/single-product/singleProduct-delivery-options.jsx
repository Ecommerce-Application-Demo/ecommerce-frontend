import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import addressThunk from '../../api/asyncThunk/addressAsyncThunk';
import singleProductThunk from '../../api/asyncThunk/product-thunk/singleProductThunk';
import ChangePincodeModal from '../../modals/changePincodeModal';
import { FreeDelivery, PayOnDelivery, ReturnDelivery } from '../../assets/icons';
import { authenticateErrorHandler } from '../../api/utilities/helper';
import { addAddressForDeliveryOption, deleteAddressForDeliveryOption } from '../../redux/Slices/product/singleProductSlice';

const SingleProductDeliveryOptions = ({
  dispatch,
  inStock,
  isLoggedIn,
}) => {
//redux states---------------------------------------
  const addressData = useSelector((state) => state.address);
  const isDeliverableData = useSelector((state) => state.product.isDeliverableData);
  const addressForDeliveryOption = useSelector((state) => state.product.addressForDeliveryOption);
  const sizeForDeliveryOption = useSelector((state)=>state.product.sizeForDeliveryOption);

//hooks-------------------------------
  const [pincode, setPincode] = useState('');
  const [checkPincodeText, setCheckPincodeText] = useState('CHECK');
  const [changePincodeModal, setChangePincodeModal] = useState(false);

  const { defaultAddress, address } = addressData;
  const {deliverableDetails, lowestDeliveryTime} = isDeliverableData;

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(addressThunk.viewAddress())
        .unwrap()
        .catch((error) => {
          if (error?.name === 'CustomError') {
            authenticateErrorHandler(dispatch, error);
          }
        });
    }
  }, [dispatch, isLoggedIn]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     if (addressForDeliveryOption?.addId) {
  //       setPincode(`${addressForDeliveryOption.name} (${addressForDeliveryOption.pincode})`);
  //       setCheckPincodeText('CHANGE');
  //     } else if (defaultAddress?.pincode && !addressForDeliveryOption?.pincode) {
  //       setPincode(`${defaultAddress.name} (${defaultAddress.pincode})`);
  //       const addressData = {
  //         name: defaultAddress?.name,
  //         addId: defaultAddress?.addId,
  //         pincode: defaultAddress?.pincode,
  //       }
  //       dispatch(addAddressForDeliveryOption(addressData));
  //       setCheckPincodeText('CHANGE');
  //     }
  //   } else {
  //     if (addressForDeliveryOption?.pincode) {
  //       setPincode(addressForDeliveryOption.pincode);
  //       setCheckPincodeText('CHANGE');
  //     } else {
  //       setPincode('');
  //       setCheckPincodeText('CHECK');
  //     }
  //   }
  // }, [isLoggedIn, addressForDeliveryOption, defaultAddress]);

  useEffect(()=>{
    if (isLoggedIn) {
      if (addressForDeliveryOption?.pincode && addressForDeliveryOption?.addId) {
        setPincode(`${addressForDeliveryOption.name} (${addressForDeliveryOption.pincode})`);
        setCheckPincodeText('CHANGE');
      } else if(addressForDeliveryOption?.pincode && !addressForDeliveryOption?.addId) {
        setPincode(addressForDeliveryOption.pincode);
        setCheckPincodeText('CHANGE');
      } else if(!addressForDeliveryOption?.pincode && !addressForDeliveryOption?.addId && defaultAddress) {
        setPincode(`${defaultAddress?.name} (${defaultAddress?.pincode})`);
        const addressData = {
          name: defaultAddress?.name,
          addId: defaultAddress?.addId,
          pincode: defaultAddress?.pincode,
        }
        dispatch(addAddressForDeliveryOption(addressData));
        setCheckPincodeText('CHANGE');
      }
    } else {
      if (addressForDeliveryOption?.pincode && addressForDeliveryOption?.addId) {
        setPincode(``);
        dispatch(deleteAddressForDeliveryOption());
        setCheckPincodeText('CHECK');
      } else if(addressForDeliveryOption?.pincode && !addressForDeliveryOption?.addId) {
        setPincode(addressForDeliveryOption?.pincode);
          setCheckPincodeText('CHANGE');
      } else {
        setPincode('');
        setCheckPincodeText('CHECK');
      }
    }
  },[isLoggedIn, addressForDeliveryOption]);

  const handleCheckPincode = () => {
    if (!isLoggedIn) {
      if (checkPincodeText === 'CHANGE') {
        setPincode('');
        setCheckPincodeText('CHECK');
        dispatch(deleteAddressForDeliveryOption());
      } else if (pincode?.length === 6 && checkPincodeText === 'CHECK') {
        const addressData = {
          name: null,
          addId: null,
          pincode,
        };
        const checkDeliveryData = {
          skuId: sizeForDeliveryOption,
          pincode,
        }
        dispatch(singleProductThunk.checkDelivery(checkDeliveryData)).unwrap()
        .then(()=>{
          dispatch(addAddressForDeliveryOption(addressData));
        setCheckPincodeText('CHANGE');
        })
        // dispatch(addAddressForDeliveryOption(addressData));
      }
    } else {
      if (checkPincodeText === 'CHANGE') {
        setChangePincodeModal(true);
      }
    }
  };

  return (
    <>
      <div className="singleProduct-details-deliveryOption-container">
        <div className="deliveryOption-text">DELIVERY OPTIONS</div>
        <div className="changePincode-wrapper">
          <span>
            {addressForDeliveryOption?.pincode ? 
              <p>{pincode}</p>
               : 
              <input
                className="enterpincode-input"
                placeholder="enter your pincode"
                onChange={(e) => {
                  if (e.target.value.length <= 6) {
                    setPincode(e.target.value);
                  }
                }}
                value={pincode}
                type="number"
                maxLength={6}
                max={6}
              />
            }
          </span>
          <span onClick={handleCheckPincode}>{checkPincodeText}</span>
        </div>
          {!addressForDeliveryOption?.pincode && <p style={{color: 'orangered'}}>Enter your pincode to check the delivery availability</p>}
        {isDeliverableData?.START ?
          <div className="deliveryOption-wrapper">
            <div className='delivery-time-loading-left'/>
            <span className='delivery-time-loading-right'/>
          </div>
          :
          lowestDeliveryTime && addressForDeliveryOption?.pincode ? 
          <div className="deliveryOption-wrapper">
            <FreeDelivery />
            <span>{lowestDeliveryTime}</span>
          </div>:
          null
          }
        <div className="deliveryOption-wrapper">
          <PayOnDelivery />
          <span>Pay on delivery available</span>
        </div>
        <div className="deliveryOption-wrapper">
          <ReturnDelivery />
          <span>Easy 14 days return & exchange available</span>
        </div>
        <div className="deliveryOption-originalProduct">100% Original Products</div>
      </div>
      {changePincodeModal && (
        <ChangePincodeModal
          addresses={address}
          dispatch={dispatch}
          addressForDeliveryOption={addressForDeliveryOption}
          setChangePincodeModal={setChangePincodeModal}
        />
      )}
    </>
  );
};

export default SingleProductDeliveryOptions;
