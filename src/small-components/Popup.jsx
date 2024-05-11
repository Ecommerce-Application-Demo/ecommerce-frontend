import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GiTireIronCross } from "react-icons/gi";

const Popup = ({ onClose, children }) => {
  const [closing, setClosing] = useState(false);

//   const handleClose = () => {
//     setClosing(true);
//     setTimeout(() => {
//       onClose();
//     }, 800); // Adjust the timeout to match the animation duration
//   };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.popup-main-container')) {
        setClosing(true);
        onClose();
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  useEffect(() => {
    if (closing) {
      document.body.classList.add('popup-closing');
      setTimeout(() => {
        document.body.classList.remove('popup-closing');
        setClosing(false);
      }, 800);
    }
  }, [closing]);

  return (
    <div className={`popup-main-container ${closing ? 'closing' : ''}`}>
    <div className="popup-overlay" onClick={onClose}></div>
    <div className={`popup-container`}>
      <div className='popup-title-wrapper'>
        <div></div>
        <div onClick={onClose}>
      <GiTireIronCross size={25}/>
        </div>
      </div>
      <div className="popup-children-wrapper">
        {children}
      </div>
    </div>
    </div>
  );
};

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Popup;
