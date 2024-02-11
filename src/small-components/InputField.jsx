import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { GreenTick } from '../assets/icons';
import classNames from 'classnames';

const InputField = ({ 
  label, name, type = 'text', value = '', onChange, error, disabled = false, isRequired = false, maxLength='', readOnly=false, className, classNameForError='', successFlag=true }) => {
  const [focus, setFocus] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setFocus(true);
  };

  useEffect(() => {
    if (focus) {
      setHasContent(true);
    } else {
      if (value && value.length > 0) {
        setHasContent(true);
      } else {
        setHasContent(false);
      }
    }
  }, [focus, value]);
  

  const handleBlur = (e) => {
    setFocus(false);
    if (!e.target.value) {
      setHasContent(false);
    }
  };

  const handleClickLabel = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const successValidation = !error && value;

  const inputWrapper = classNames({
    'react-input-wrapper': true,
    'react-input-wrapper--success': successValidation && !disabled,
    'react-input-wrapper--normal': !successFlag || (!successValidation && !disabled),
    'react-input-wrapper--disabled': disabled,
  });

  const labelStyle = classNames({
    'label-text': !(focus || hasContent) && !disabled,
    'label-text-focus': (focus || hasContent) && !disabled,
    'label-text-disabled': !(focus || hasContent) && disabled,
    'label-text-focus-disabled': (focus || hasContent) && disabled,
    'label-text-success': (focus || hasContent) && !disabled && successValidation && successFlag,
  });
  
  const inputStyle = classNames({
    'input-basic': true,
    'input-normal': (!successValidation || !successFlag) && !disabled,
    'input-success': successValidation && successFlag && !disabled,
    'input-disabled': disabled,
  });

  const mainContainer = classNames({
    'react-input-container': true,
    [className]:className,
  })

  return (
    <>
    <div className={mainContainer} onClick={handleClickLabel}>
      <label htmlFor={name} className={labelStyle}>
        {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
      </label>
      <div className={inputWrapper}>
        <input
          ref={inputRef}
          autoComplete="off"
          type={type}
          disabled={disabled}
          maxLength={maxLength}
          id={name}
          name={name}
          onFocus={handleFocus}
          value={value}
          onBlur={handleBlur}
          onChange={onChange}
          className={inputStyle}
          readOnly={readOnly}
        />
        {(successValidation && !disabled && successFlag) && <GreenTick height="20px" width="20px" className="greenTick" />}
      </div>
      {(error && !classNameForError) && <div style={{ color: 'red',marginLeft:'15px' }}>{error}</div>}
    </div>
    {(error && classNameForError) && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  maxLength: PropTypes.number,
  readOnly:PropTypes.bool,
  className: PropTypes.string ,
  classNameForError:PropTypes.string,
  successFlag:PropTypes.bool,
};

export default InputField;
