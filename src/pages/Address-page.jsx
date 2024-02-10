import React, { useState } from "react";
import ViewAddress from "../components/address/view-address";
import AddAddress from "../components/address/add-address";
import EditAddress from "../components/address/edit-address";

const AddreessPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [selectedAddressForEdit, setSelectedAddressForEdit] = useState();
  const handleClickAddAddress = () => {
    setShowAddModal(true);
  };
  return (
    <div className="address-main-container">
      <div className="address-title-container">
        <h2>Saved Addresses</h2>
        <div
          className="address-add-address-btn"
          onClick={handleClickAddAddress}
        >
          + ADD NEW ADDRESS
        </div>
      </div>
      <ViewAddress
        addressData={addressData}
        setShowEditAddressModal={setShowEditAddressModal}
        setSelectedAddressForEdit={setSelectedAddressForEdit}
      />

      {showAddModal && (
        <AddAddress
          showAddModal={showAddModal}
          setShowAddModal={setShowAddModal}
          addressData={addressData}
          setAddressData={setAddressData}
        />
      )}

      {showEditAddressModal && (
        <EditAddress
          showEditAddressModal={showEditAddressModal}
          setShowEditAddressModal={setShowEditAddressModal}
          selectedAddressForEdit={selectedAddressForEdit}
        />
      )}
    </div>
  );
};

export default AddreessPage;
