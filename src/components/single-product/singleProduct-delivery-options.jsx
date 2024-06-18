import React, { useEffect, useState } from 'react'
import addressThunk from '../../api/asyncThunk/addressAsyncThunk';
import { useSelector } from 'react-redux';
import { FreeDelivery, GreenTick, PayOnDelivery, ReturnDelivery } from "../../assets/icons";
import { authenticateErrorHandler } from '../../api/utilities/helper';

const SingleProductDeliveryOptions = (props) => {
  //redux states---------
    const addressData = useSelector((state)=> state.address);
  //props----------------
    const {
        dispatch,
        isLoggedIn,
    } = props;
    const [pincode, setPincode] = useState(localStorage.getItem('ADDRESS') || '');
    const { defaultAddress } = addressData;
    useEffect(()=>{
        // if (isLoggedIn) {
          dispatch(addressThunk.viewAddress()).unwrap()
          .catch((error)=>{
            if (error?.name === 'CustomError') {
              authenticateErrorHandler(dispatch, error);
            }
          })
        // }
    },[]);

    useEffect(()=>{
      if (defaultAddress) {
        setPincode(`${defaultAddress?.name} (${defaultAddress?.pincode})`)
      }
    },[defaultAddress]);
  
  const handleCheckPincode = ()=> {
    if(pincode?.length === 6) {
      localStorage.setItem('ADDRESS', pincode);
    }
  }
  return (
    <div className="singleProduct-details-deliveryOption-container">
        <div className="deliveryOption-text">DELIVERY OPTIONS</div>
        <div className="changePincode-wrapper">
          <span>{(isLoggedIn && defaultAddress) ? 
            <p>{pincode}</p>: 
            <input 
            className='enterpincode-input'
            placeholder='enter your pincode'
            onChange={(e)=>setPincode(e.target.value)}
            value={pincode}
            /> }
            {/* <GreenTick height='20' width='20' /> */}
            </span>
          {(isLoggedIn && defaultAddress) ? <span>CHANGE</span> : <span onClick={handleCheckPincode}>CHECK</span>}
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
  )
}

export default SingleProductDeliveryOptions;
