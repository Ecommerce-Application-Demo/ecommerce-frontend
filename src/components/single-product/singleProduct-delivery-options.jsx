import React, { useEffect, useState } from 'react'
import addressThunk from '../../api/asyncThunk/addressAsyncThunk';
import { useSelector } from 'react-redux';
import { FreeDelivery, GreenTick, PayOnDelivery, ReturnDelivery } from "../../assets/icons";
import { authenticateErrorHandler } from '../../api/utilities/helper';
import singleProductThunk from '../../api/asyncThunk/product-thunk/singleProductThunk';
import ChangePincodeModal from '../../modals/changePincodeModal';

const SingleProductDeliveryOptions = ({
  dispatch,
  isLoggedIn,
}) => {
  //redux states---------
  const addressData = useSelector((state) => state.address);
  const isDeliverableData = useSelector((state) => state.product.isDeliverableData);

  //hooks-----------------------
  const [pincode, setPincode] = useState(localStorage.getItem('ADDRESS') || '');
  const [checkPincodeText, setCheckPincodeText] = useState('CHECK');
  const [changePincodeModal, setChangePincodeModal] = useState(false);

  //variables-------------
  const { checkDelivery } = singleProductThunk;
  const { defaultAddress, address } = addressData;
  const { START, SUCCESS, FAIL, deliverableDetails } = isDeliverableData;

  useEffect(() => {
    // if (isLoggedIn) {
    dispatch(addressThunk.viewAddress()).unwrap()
      .catch((error) => {
        if (error?.name === 'CustomError') {
          authenticateErrorHandler(dispatch, error);
        }
      })
    // }
  }, []);

  useEffect(() => {
    if (isLoggedIn && defaultAddress) {
      setCheckPincodeText('CHANGE');
      setPincode(`${defaultAddress?.name} (${defaultAddress?.pincode})`)
    }
  }, [defaultAddress]);
  useEffect(()=>{
    if(localStorage.getItem('ADDRESS')) {
      setCheckPincodeText('CHANGE');
    } else if(pincode === ''){
      setCheckPincodeText('CHECK');
    } else {
      setCheckPincodeText('CHECK')
    }
  },[]);

  const handleCheckPincode = () => {
    if(!isLoggedIn) {
      if(checkPincodeText === 'CHECK') {
        setCheckPincodeText('CHANGE');
      } else if(checkPincodeText === 'CHANGE' && !isLoggedIn) {
        setPincode('');
        setCheckPincodeText('CHECK')
        localStorage.removeItem('ADDRESS');
      }
      if (pincode?.length === 6 && checkPincodeText === 'CHECK') {
        localStorage.setItem('ADDRESS', pincode);
        // dispatch(checkDelivery())
      }
    } else if(isLoggedIn) {
      if (checkPincodeText === 'CHANGE') {
        setChangePincodeModal(true);
      }
    }
  }
  return (
    <>
    <div className="singleProduct-details-deliveryOption-container">
      <div className="deliveryOption-text">DELIVERY OPTIONS</div>
      <div className="changePincode-wrapper">
        <span>{(isLoggedIn && defaultAddress) ?
          <p>{pincode}</p> :
          checkPincodeText === 'CHANGE' ?
          <p>{pincode}</p>
          :
          <input
            className='enterpincode-input'
            placeholder='enter your pincode'
            onChange={(e) => setPincode(e.target.value)}
            value={pincode}
            type='number'
            maxLength={6}
            max={6}
          />}
          {/* <GreenTick height='20' width='20' /> */}
        </span>
        <span onClick={handleCheckPincode}>{checkPincodeText}</span>
      </div>
      <div className="deliveryOption-wrapper">
        <FreeDelivery />
        <span>Get it by Wed, Apr 10</span>
      </div>
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
    {changePincodeModal && 
      <ChangePincodeModal 
        setChangePincodeModal={ setChangePincodeModal }
        addresses={ address }
      />
    }
    </>
  )
}

export default SingleProductDeliveryOptions;
