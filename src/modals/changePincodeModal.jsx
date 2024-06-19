import React from 'react';
import Modal from '../small-components/Modal-global';
import Popup from '../small-components/Popup'; 
import { SiTicktick } from "react-icons/si";
import useBreakpoints from '../api/utilities/responsive';

const ChangePincodeModal = ({
  addresses,
  setChangePincodeModal,
}) => {
  const { isMobile } = useBreakpoints();
  const onClose = () => {
    setChangePincodeModal(false);
  };

  console.log(addresses, 'address');

  const AddressContent = () => (
    <div className='changePincodeModal-container'>
      <div className='custompincode-wrapper'>
        <input
          placeholder='Enter your pincode'
        />
        <span>CHECK</span>
      </div>
      <div className='or-wrapper'>
        <div className='divider--horizontal' />
        <span>OR</span>
        <div className='divider--horizontal' />
      </div>
      <h2 className='selectAddress-text'>Select a saved address to check delivery info</h2>
      <div className='allAddresses-wrapper'>
        {addresses?.map((address) => (
          <div className='addressCardPincode-wrapper' key={address?.id}>
            <div className='addressCardPincode-leftside'>
              <div className='addressCardPincodeLeft-nameWrap'>
                <p>{address?.name},{address?.pincode}</p>
                <p className='addressType'>{address?.addressType}</p>
              </div>
              <p className='addressLine'>{address?.addressLine1}</p>
            </div>
            <div className='addressCardPincode-rightside'>
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
