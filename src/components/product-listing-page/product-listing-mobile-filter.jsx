import React from 'react'
import Popup from '../../small-components/Popup';

const ProductListingMobileFilter = ({
    setOpenFilterModal,
}) => {
  return (
    <Popup
    title='Filter'
    onClose={()=>setOpenFilterModal(false)}
    >
        <div style={{color:'white'}}>Coming soon....</div>
    </Popup>
  )
}

export default ProductListingMobileFilter;
