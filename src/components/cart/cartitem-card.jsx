import React from 'react'
import productImages from '../../assets/pictures/offline_images.png';
import Checkbox from '../../small-components/checkbox';
import { TbTruckReturn } from "react-icons/tb";
import { BiSolidDownArrow } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";
import { RxCross1 } from "react-icons/rx";

const CartItemCard = (props) => {
    const {
        Checkbox2,
        handleCheckboxChange,
    } = props;

  return (
    <div className='cartCard-container'>
        <div className='crossSymbol'>
            <RxCross1 size={25}/>
        </div>
      <div className='card-leftside'>
        <img src={productImages} alt='product' />
        <div>
            <Checkbox 
             checked={Checkbox2}
             onChange={(isChecked) => handleCheckboxChange('checkbox2', isChecked)}
            />
        </div>
      </div>
      <div className='card-rightside'>
        <p className='brandname'>PUMA</p>
        <p className='productname'>Men Black Tshirt</p>
        <div className='size-container'>
            <p className='size-btn'>Size: S <BiSolidDownArrow size={8}/></p>
            <p className='size-btn'>Qty: 1 <BiSolidDownArrow size={8}/></p>
            <p className='left-btn'>4 left</p>
        </div>
        <div className='price-container'>
            <p className='price--actual'>Rs. 968 </p>
            <p className='price--mrp'>Rs. 1599</p>
            <p className='price--discount'>43% OFF</p>
        </div>
        <p className='return-textwrap'><TbTruckReturn size={18}/><span>14 days</span> return available</p>
        <p className='return-textwrap'><SiTicktick/> Delivery between <span>15 Jun to 17 Jun</span></p>
      </div>
    </div>
  )
}

export default CartItemCard;
