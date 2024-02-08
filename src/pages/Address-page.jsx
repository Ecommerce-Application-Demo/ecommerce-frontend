import React, { useState } from 'react'
import ViewAddress from '../components/address/view-address';
import AddAddress from '../components/address/add-address';

const AddreessPage = () => {
const [showAddModal,setShowAddModal]=useState(false);
const [addressData,setAddressData]=useState([]);
const handleClickAddAddress = () => {
  setShowAddModal(true)
}
  return (
    <div className='address-main-container'>
      <div className='address-title-container'>
        <h2>Saved Addresses</h2>
        <div className='address-add-address-btn' onClick={handleClickAddAddress}>+ ADD NEW ADDRESS</div>
        {showAddModal && <AddAddress showAddModal={showAddModal} setShowAddModal={setShowAddModal} addressData={addressData} setAddressData={setAddressData}/>}
      </div>
      <ViewAddress addressData={addressData}/>
    </div>
  )
}

export default AddreessPage;