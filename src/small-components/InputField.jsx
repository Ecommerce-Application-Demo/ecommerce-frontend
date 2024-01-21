import React, { useEffect, useState } from 'react';
import { GreenTick } from '../assets/icons';
import classNames from 'classnames';
const InputField = ({ label, name, type = 'text', value, onChange, error,disabled=false}) => {
    const [focus,setFocus]=useState(false);
    // value='kingshuk'
    // disabled=false;
    const [hasContent,setHasContent]=useState(false);
    const handleFocus=()=>{
        setFocus(true);
    }
    useEffect(()=>{
    if(value && value.length>0) {
      setHasContent(true);
    }else{
      setHasContent(false)
    }
  });
  const handleBlur=(e)=>{
    setFocus(false);
    if(!e.target.value) {
      console.log('onblur');
      setHasContent(false);
    }
  }
    const successValidation = !error && value;

    const inputWrapper = classNames({
      'react-input-wrapper': true,
      'react-input-wrapper--success': successValidation && !disabled,
      'react-input-wrapper--normal': !successValidation && !disabled,
      'react-input-wrapper--disabled': disabled,
    });
    const labelStyle =classNames({
      'label-text':!(focus || hasContent) && !disabled,
      'label-text-focus': (focus|| hasContent) && !disabled,
      'label-text-disabled':!(focus || hasContent) && disabled,
      'label-text-focus-disabled':(focus|| hasContent) && disabled,
    })

    const inputStyle=classNames({
      'input-basic':true,
      'input-normal':!successValidation && !disabled,
      'input-success':successValidation && !disabled,
      'input-disabled':disabled,
    })
    
  return (
    <div className='react-input-container'>
      <label htmlFor={name} className={labelStyle}>{label}</label>
      <div className={inputWrapper}>
      <input
      autoComplete='off'
        type={type}
        disabled={disabled}
        id={name}
        name={name}
        onFocus={handleFocus}
        value={value}
        onBlur={handleBlur}
        onChange={onChange}
        className={inputStyle}
      />
      {(successValidation && !disabled) && <GreenTick height='20px' width='20px' className='greenTick'/>}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
export default InputField;