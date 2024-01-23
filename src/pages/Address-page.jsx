import React, { useState } from 'react'
import ViewAddress from '../components/address/view-address';
import AddAddress from '../components/address/add-address';

const AddreessPage = () => {
const [showAddModal,setShowAddModal]=useState(false);
const handleClickAddAddress = () => {
  setShowAddModal(true)
}
  return (
    <div className='address-main-container'>
      <div className='address-title-container'>
        <h3>Saved Addresses</h3>
        <div className='address-add-address-btn' onClick={handleClickAddAddress}>+ ADD NEW ADDRESS</div>
        {showAddModal && <AddAddress showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>}
      </div>
      <ViewAddress/>
    </div>
  )
}

export default AddreessPage;