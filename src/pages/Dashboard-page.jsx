import React from 'react'
import { PiSmileyWinkFill } from "react-icons/pi";
import { ImProfile } from "react-icons/im";
import { FaAngleRight } from "react-icons/fa";
import { RiLuggageDepositLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { LiaAddressCardSolid } from "react-icons/lia";
import { PiContactlessPaymentLight } from "react-icons/pi";
import { AiFillCopy } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { TbInfoSquareFilled } from "react-icons/tb";
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className='global-margin'>
        <div className='dashboard-main-container'>
        <div className='dashboard-top-background'></div>
        <div className='dashboard-user-icon-wrapper'>
            <div>
        <PiSmileyWinkFill className='dashboard-user-icon'/>
            </div>
        </div>
        <p className='dashboard-user-email'>kinghukr713@gmail.com</p>
        <div className='dashboard-divider-line'></div>
        <div className='dashboard-sections-wrapper'>
        <div className='dashboard-sections'>
          <div className='dashboard-section-leftside-wrapper'>
          <RiLuggageDepositLine size={28}/>
          <div className='dashboard-section-content-wrapper'>
              <p>Orders</p>
              <p>Check your order status</p>
          </div>
          </div>
          <FaAngleRight size={20} />
        </div>
        <div className='dashboard-sections'>
          <div className='dashboard-section-leftside-wrapper'>
          <AiOutlineShoppingCart size={28}/>
          <div className='dashboard-section-content-wrapper'>
              <p>Cart</p>
              <p>Your cart awaits your selections</p>
          </div>
          </div>
          <FaAngleRight size={20} />
        </div>
        <div className='dashboard-sections'>
          <div className='dashboard-section-leftside-wrapper'>
          <FaHeart size={28}/>
          <div className='dashboard-section-content-wrapper'>
              <p>Wishlists</p>
              <p>Shop your heart out with your faviorite</p>
          </div>
          </div>
          <FaAngleRight size={20} />
        </div>
        <div className='dashboard-divider-line'></div>
        <div className='dashboard-sections'>
          <div className='dashboard-section-leftside-wrapper'>
          <LiaAddressCardSolid size={28}/>
          <div className='dashboard-section-content-wrapper'>
              <p>Addresses</p>
              <p>Save addresses for hastle free checkout</p>
          </div>
          </div>
          <FaAngleRight size={20} />
        </div>
        <div className='dashboard-sections'>
          <div className='dashboard-section-leftside-wrapper'>
          <AiFillCopy size={28}/>
          <Link className='dashboard-section-content-wrapper' to='/my/profile'>
              <p>Profile</p>
              <p>Change your profile details</p>
          </Link>
          </div>
          <FaAngleRight size={20} />
        </div>
        <div className='dashboard-sections'>
          <div className='dashboard-section-leftside-wrapper'>
          <PiContactlessPaymentLight size={28}/>
          <div className='dashboard-section-content-wrapper'>
              <p>Payment Options</p>
              <p>Save your cards for one click order</p>
          </div>
          </div>
          <FaAngleRight size={20} />
        </div>
        <div className='dashboard-divider-line'></div>
        <div className='dashboard-sections'>
          <div className='dashboard-section-leftside-wrapper'>
          <bInfoSquareFilled size={28}/>
          <div className='dashboard-section-content-wrapper'>
              <p>About Us</p>
              <p>One step to know us</p>
          </div>
          </div>
          <FaAngleRight size={20} />
        </div>
        <div className='dashboard-logout-wrapper'>
          Logout
        </div>
        </div>
        </div>
    </div>
  )
}

export default DashboardPage;