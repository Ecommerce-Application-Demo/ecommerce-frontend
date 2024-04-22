import React, { useEffect, useRef } from 'react'
import { BiSolidUserDetail } from "react-icons/bi";
import { FaAngleRight } from "react-icons/fa6";

const SideNavbar = (props) => {
  const {
    sidebarOpen,
    setSidebarOpen,
  } = props;

  const ref= useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen, setSidebarOpen]);
  return (
    <div className='side-navbar-container' ref={ref}>
      <div className='side-navbar-login-section'>
        <div className="side-navbar-user-icon-wrapper">
          <BiSolidUserDetail size={60}/>
        </div>
          KINGSHUK ROY
        </div>
      <div className="side-navbar-masterCategory-section">
        <div>
        <p>MEN</p>
        <FaAngleRight />
        </div>
        <div>
        <p>WOMEN</p>
        <FaAngleRight />
        </div>
        <div>
        <p>KIDS</p>
        <FaAngleRight />
        </div>
        <div>
        <p>FOOTWEAR</p>
        <FaAngleRight />
        </div>
      </div>
      <div className="side-navbar-account-section">
        <p>ACCOUNT</p>
        <p>ORDERS</p>
        <p>CANCELATIONS</p>
        <p>CONTACT US</p>

        <p>LOGOUT</p>
      </div>
    </div>
  )
}

export default SideNavbar;