import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import addressThunk from '../../api/asyncThunk/addressAsyncThunk';
import LoadingScreen from '../../small-components/Loading-screen';
import { toast } from 'react-toastify';
import { authenticateErrorHandler } from '../../api/utilities/helper';
import { useNavigate } from 'react-router-dom';

const ViewAddress = (props) => {
  const navigate = useNavigate();
  const {
    setShowEditAddressModal,
    setSelectedAddressForEdit,
  } = props;
    const [hoverCard,setHoverCard] = useState(null);
    
    const dispatch = useDispatch();
    const stateAddress = useSelector(state=> state.address);
    const {address, isAddressLoading,editDeleteAddAddressSuccess, defaultAddress} = stateAddress;
    const {viewAddress, removeAddress, editAddress} = addressThunk;

    useEffect(()=>{
        dispatch(viewAddress()).unwrap().then()
        .catch((error)=> {
          if (error?.name === 'CustomError') {
            navigate('/login-signup')
            authenticateErrorHandler(dispatch, error);
          }
        })
    },[]);

    useEffect(()=>{
        if (editDeleteAddAddressSuccess) {
        dispatch(viewAddress()).unwrap().then()
        .catch((error)=> {
          if (error?.name === 'CustomError') {
            navigate('/login-signup')
            authenticateErrorHandler(dispatch, error);
          } 
        })
        }
    },[editDeleteAddAddressSuccess]);

    const mouseEnterOnCard =(index) =>{
        setHoverCard(index);
    }
    const mouseRemoveFromCard =() =>{
        setHoverCard(null);
    }

    const handleRemoveBtn = (addId) => {
        if (addId !==defaultAddress?.addId) {
        dispatch(removeAddress(addId)).unwrap().then(()=>{
            toast.success('address deleted successfully')
        }).catch(error=> {
          if (error?.name === 'CustomError') {
            navigate('/login-signup')
            authenticateErrorHandler(dispatch, error);
          }
        })
    } else {
        toast.warn('default address could not be deleted!!')
    }
    };

    const handleEditAddress = (selectedAddress) => {
      setSelectedAddressForEdit(selectedAddress)
      setShowEditAddressModal(true);
    }

    const handleDefaultLink =(item) =>{
      const  dataTobeDispatched = {
            addId: item?.addId,
            name: item?.name,
            phoneNumber:item?.phoneNumber,
            addressLine1:item?.addressLine1,
            pincode: item?.pincode,
            state: item?.state,
            locality: item?.locality,
            city: item?.city,
            addressType: item?.addressType,
            default: true,
        };
        dispatch(editAddress(dataTobeDispatched)).unwrap().then(()=>{
            toast.success('default address changed successfully.')
        }).catch(error=>{
          if (error?.name === 'CustomError') {
            navigate('/login-signup')
            authenticateErrorHandler(dispatch, error);
          }
        })
    }
  return (
    <>
      {isAddressLoading && <LoadingScreen />}
      <div className="viewAddress-main-container">
        {address === "No Address registered." || address?.length === 0 ? (
          <div className="viewAddress-empty-wrapper">
            <h1>No Address Found, Please Try To Add Address</h1>
          </div>
        ) : (
          <>
            {defaultAddress && (
              <>
                <h4>DEFAULT ADDRESS</h4>
                <div className="viewAddress-allCard-wrapper">
                      <div
                        className="viewAddress-card-wrapper"
                        onMouseEnter={() => mouseEnterOnCard(defaultAddress?.addId)}
                        onMouseLeave={mouseRemoveFromCard}
                      >
                        <h4>{defaultAddress?.name}</h4>
                        <p className="viewAddress-address-type">{defaultAddress?.addressType}</p>
                        <div className="viewAddress-card-addressBar">
                          <p>{defaultAddress?.addressLine1}</p>
                          <p>{defaultAddress?.locality}</p>
                          <p>{defaultAddress?.city} - {defaultAddress?.pincode}</p>
                        </div>
                        {hoverCard === defaultAddress.addId && (
                          <>
                            <p>{defaultAddress?.state}</p>
                            <p>Mobile: {defaultAddress?.phoneNumber}</p>
                            <div className="viewAddress-card-footer-btn">
                              <div onClick={()=>handleEditAddress(defaultAddress)}>Edit</div>
                              <div
                                style={{
                                  border: "1px solid grey",
                                  color: "grey",
                                }}
                                onClick={() => handleRemoveBtn(defaultAddress.addId)}
                              >
                                Remove
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                </div>
              </>
            )}

            {address?.length > 1 &&
            <h4>OTHER ADDRESSES</h4>
            }
            <div className="viewAddress-allCard-wrapper">
              {address?.map((item, index) => {
                return (
                    !item?.default &&
                  <div
                    className="viewAddress-card-wrapper"
                    key={index}
                    onMouseEnter={() => mouseEnterOnCard(index)}
                    onMouseLeave={mouseRemoveFromCard}
                  >
                    <h4>{item?.name}</h4>
                    <p className="viewAddress-address-type">{item?.addressType}</p>
                    <div className="viewAddress-card-addressBar">
                      <p>{item?.addressLine1}</p>
                      <p>{item?.locality}</p>
                      <p>{item?.city} - {item?.pincode}</p>
                    </div>
                    {hoverCard === index && (
                      <>
                        <p>{item?.state}</p>
                        <p>Mobile: {item?.phoneNumber}</p>
                        <p className='viewAddress-defaultAddress-link' onClick={()=>handleDefaultLink(item)}>MAKE THIS A DEFAULT ADDRESS</p>
                        <div className="viewAddress-card-footer-btn">
                          <div onClick={()=>handleEditAddress(item)}>Edit</div>
                          <div
                            style={{ border: "1px solid grey", color: "grey" }}
                            onClick={() => handleRemoveBtn(item?.addId)}
                          >
                            Remove
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
        {/* <div className='viewAddress-card-wrapper' onMouseEnter={mouseEnterOnCard} onMouseLeave={mouseRemoveFromCard}>
                <p>Kingshuk Roy</p>
                <p className='viewAddress-address-type'>Home</p>
                <div className='viewAddress-card-addressBar'>
                    <p>z-5/174/A</p>
                    <p>kolkata: 700018</p>
                </div>
                {clickCard && 
                <>
                    <p>West Bengal</p>
                    <p>Mobile: 7003874065</p>
                <div className='viewAddress-card-footer-btn'>
                    <div>Edit</div>
                    <div style={{border:'1px solid grey', color:'grey'}}>Remove</div>
                </div>
                </>
                }
        </div> */}
      </div>
    </>
  );
}

export default ViewAddress;