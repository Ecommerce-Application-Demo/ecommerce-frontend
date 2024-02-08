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
    const handleClickOutside = event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const screenWidth_mobile = dimensions.width < 480;
  const screenWidth_tab = dimensions.width < 768 && dimensions.width > 480;

  const handleWidth = () => {
    if (screenWidth_mobile) {
      return widthForMobile || widthForTab || width;
    } else if (screenWidth_tab) {
      return widthForTab || width;
    } else {
      return width;
    }
  };

  const divStyle = {
    height: height,
    width: handleWidth(),
    overflow: 'auto',
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
      <div className="modal-backdrop"></div>
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
