import React, { useState } from 'react';
import { GreenTick } from '../assets/icons';
import classNames from 'classnames';
const InputField = ({ label, name, type = 'text', value, onChange, error,disabled=false }) => {
    const [focus,setFocus]=useState(false);
    const [hasContent,setHasContent]=useState(false);
    const handleFocus=()=>{
        setFocus(true);
    }
    const handleBlur =(e)=>{
        setFocus(false);
        if(value) {
            setHasContent(true)
        }else{
            setHasContent(false)
        }
    }

    const handleOnBlur=()=>{
      handleBlur()
    //   onBlur()
    };

    const successValidation = !error && value;

    const inputWrapper = classNames({
      'react-input-wrapper': true,
      'react-input-wrapper--success': successValidation,
      'react-input-wrapper--normal': !successValidation,
    });
    const inputField =classNames({
      
    })
    
  return (
    <div className='react-input-container'>
      <label htmlFor={name} className={focus||hasContent ?`label-text-focus`:'label-text'}>{label}</label>
      <div className={inputWrapper}>
      <input
        type={type}
        disabled={disabled}
        id={name}
        name={name}
        onFocus={handleFocus}
        value={value}
        onChange={onChange}
        onBlur={handleOnBlur}
        className={inputField}
      />
      {successValidation && <GreenTick height='20px' width='20px' className='greenTick'/>}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
export default InputField;