import React, { useState } from 'react';

const Checkbox = ({ checked, onChange, disabled=false }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div
      className={`custom-checkbox ${isChecked ? 'checked' : ''}`}
      onClick={handleCheckboxClick}
      disabled ={disabled}
    />
  );
};

export default Checkbox;
