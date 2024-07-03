import React from 'react'
import Checkbox from '../../small-components/checkbox';
import CartItemCard from './cartitem-card';
import { useState } from 'react';

const CartSection = () => {
    const [checkboxState, setCheckboxState] = useState({
      checkbox1: false,
      checkbox2: false,
    });
    
    const handleCheckboxChange = (name, isChecked) => {
      setCheckboxState(prevState => ({
        ...prevState,
        [name]: isChecked,
      }));
    };

  return (
    <div className='cartSection-container'>
      <div className='cartSection-items'>
        <div className='cartSection-item-left'>
          <Checkbox 
           checked={checkboxState.checkbox1}
           onChange={(isChecked) => handleCheckboxChange('checkbox1', isChecked)}
          />
          <p>1/1 ITEMS SELECTED</p>
        </div>
        <div className='cartSection-item-right'>
          <p>REMOVE</p>
          <div className='divider--verticle' />
          <p>MOVE TO WISHLIST</p>
        </div>
      </div>
      <div className='cartsection-cardwrapper'>
        <CartItemCard 
        checkbox2 = {checkboxState.checkbox2}
        handleCheckboxChange ={ handleCheckboxChange }
        />
        <CartItemCard 
        checkbox2 = {checkboxState.checkbox2}
        handleCheckboxChange ={ handleCheckboxChange }
        />
        <CartItemCard 
        checkbox2 = {checkboxState.checkbox2}
        handleCheckboxChange ={ handleCheckboxChange }
        />
        <CartItemCard 
        checkbox2 = {checkboxState.checkbox2}
        handleCheckboxChange ={ handleCheckboxChange }
        />
        <CartItemCard 
        checkbox2 = {checkboxState.checkbox2}
        handleCheckboxChange ={ handleCheckboxChange }
        />
      </div>
    </div>
  )
}

export default CartSection;
