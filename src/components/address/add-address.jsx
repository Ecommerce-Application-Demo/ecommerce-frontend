import React, { useState } from 'react'
import Modal from '../../small-components/Modal-global'
import InputField from '../../small-components/InputField'
import * as yup from 'yup';
const AddAddress = (props) => {
    const {
        showAddModal,
        setShowAddModal,
    } = props;
const [formData, setFormData] = useState({
    name:'',
    phoneNumber:'',
    pincode:'',
    state:'',
    address:'',
    locality:'',
    city:'',
});

const [errors, setErrors] = useState({
    name:'',
    phoneNumber:'',
    pincode:'',
    state:'',
    address:'',
    locality:'',
    city:'',
})

const handleChange = (e) =>{
  const  {name,value} = e.target;
    setFormData(prevData=>({
        ...prevData, [name]:value
    }));

    //validation
    yup.reach(validationSchemaForAddAddress,name)
    .validate(value)
    .then(()=>{
        setErrors(prevError=>({
            ...prevError,
            [name]:''
        }))
    })
    .catch(error=>{
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error.message
        }))
    })
};

//for modal close 
    const onClose =()=>{
        setShowAddModal(false)
    }
  return (
    <Modal width='500px' title='Add Address' onClose={onClose}>
        <div className='addAddress-main-container'>
            <InputField label='Name' name='name' type='text' onChange={handleChange} value={formData.name} error={errors.name}/>
            <InputField label='Phone No.' name='phoneNumber' type='number'  onChange={handleChange} value={formData.phoneNumber} error={errors.phoneNumber}/>
            <div className='addAdress-pincode-wrapper'>
                <InputField label='Pincode' name='pincode' type='number' onChange={handleChange} value={formData.pincode} error={errors.pincode}/>
                <InputField label='State' name='state' type='number' onChange={handleChange} value={formData.state} error={errors.state}/>
            </div>
            <InputField label='Address' name='address' type='text' onChange={handleChange} value={formData.address} error={errors.address}/>
            <InputField label='Locality/Town' name='locality' type='text' onChange={handleChange} value={formData.locality} error={errors.locality}/>
            <InputField label='City/District' name='city' type='text' onChange={handleChange} value={formData.city} error={errors.city}/>
        </div>
    </Modal>
  )
};

const validationSchemaForAddAddress = yup.object({
    name: yup.string().required('name is required').min(5,'minimum 5 charrecter required'),
    phoneNumber: yup.number().required('phone number is required').min(10,'10 digit required').max(10,'10 digit required'),
    pincode: yup.number().required('pincode is required').max(6,'maximum 5 charrecter required'),
    state: yup.string().required('state is required'),
    address: yup.string().required('address is required').min(5,'minimum 5 charrecter required'),
    locality: yup.string().required('locality is required'),
    city: yup.string().required('city/district is required'),
})

export default AddAddress;