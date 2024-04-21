import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CrossSymbol } from '../assets/icons';
import classNames from 'classnames';

const Modal = ({
  onClose,
  children,
  height,
  width,
  widthForMobile,
  widthForTab,
  title,
  footer,
}) => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleWidth = () => {
    if (dimensions.width < 768) {
      return widthForMobile || widthForTab || width;
    } else if (dimensions.width > 768 && dimensions.width < 1279) {
      return widthForTab || width;
    } else {
      return width;
    }
  };

  const divStyle = {
    height: height,
    width: handleWidth(),
    overflow: 'auto',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000, // Ensure modal is above other content
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    zIndex: 999, // Ensure overlay is below modal but above other content
  };

  const titleStyle = classNames({
    'modal-title-container': true,
    'modal-title-container-title-present': title,
  });

  const footerStyle = classNames({
    'modal-footer-container': true,
  });

  return createPortal(
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={divStyle} className="modal-container" ref={containerRef}>
        <div className={titleStyle}>
          {title && <p>{title}</p>}
          <div className="close-button" onClick={onClose}>
            <CrossSymbol />
          </div>
        </div>
        <div className="modal-content">{children}</div>
        {footer && <div className={footerStyle}>{footer}</div>}
      </div>
    </>,
    document.body
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  heightForTab: PropTypes.string,
  heightForMobile: PropTypes.string,
  width: PropTypes.string.isRequired,
  widthForMobile: PropTypes.string,
  widthForTab: PropTypes.string,
  title: PropTypes.string.isRequired,
  footer: PropTypes.node,
};

export default Modal;
