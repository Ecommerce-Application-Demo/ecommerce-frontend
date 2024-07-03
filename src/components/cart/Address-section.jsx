import React from 'react'
import useBreakpoints from '../../api/utilities/responsive';
import { useState } from 'react';

const AddressSection = () => {
  const {isMobile} = useBreakpoints();
  const [mobileAddress, setMobileAddress] =useState(false);

  const toggleAddressBorder = () => {
    const scrolled = document.documentElement.scrollTop;
    setMobileAddress(scrolled > 70);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleAddressBorder);
    return () => window.removeEventListener('scroll', toggleAddressBorder);
  }, []);

  return (
    <div className={`addresssection-container ${(isMobile && mobileAddress) && 'mobileAddress-container'}`}>
      <div className='addresssection-leftside'>
        <p>Deliver to: <span className='addressholder-name'>Kingshuk roy, </span><span className='address-pincode'>700018</span></p>
        {!(isMobile && mobileAddress) && <p>z-5-174-A, khaldhari kanchantala road, kolkata</p>}
      </div>
      <div className='addresssection-right'>
        CHANGE ADDRESS
      </div>
    </div>
  )
}

export default AddressSection;
