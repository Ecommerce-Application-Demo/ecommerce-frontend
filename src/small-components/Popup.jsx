import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { GiTireIronCross } from "react-icons/gi";

const Popup = ({ onClose, children, title=null, titleClassName='' }) => {
  const [closing, setClosing] = useState(false);
  // const popupContainerRef = useRef(null);
  // const [overlayHeight, setOverlayHeight] = useState('100%');

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.popup-container')) {
        handleClose();
      }
    };

    document.body.addEventListener('click', handleOutsideClick);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
      document.body.style.overflow = ''; 
    };
  }, []);


  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      document.body.style.overflow = ''; 
    }, 800);
  };

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
    <>
      <div
        className="popup-overlay"
        onClick={handleClose}
      ></div>
      <div className={`popup-main-container ${closing ? 'closing' : ''}`}>
        <div className="popup-container">
          <div className={`${titleClassName} ${title ? 'popup-title-wrapper' : `popup-title-wrapper-without-title`}`}>
            {title}
            <div onClick={handleClose}>
              <GiTireIronCross size={25}/>
            </div>
          </div>
          <div className="popup-children-wrapper">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  titleClassName: PropTypes.string,
};

export default Popup;
