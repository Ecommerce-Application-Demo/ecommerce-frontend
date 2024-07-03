import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ type, title, position, duration }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const getPositionStyle = () => {
    switch (position) {
      case 'top-left':
        return { top: '20px', left: '20px' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'bottom-right':
      default:
        return { bottom: '20px', right: '20px' };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <i className="fas fa-check-circle" style={{ marginRight: '5px' }}></i>;
      case 'warning':
        return <i className="fas fa-exclamation-circle" style={{ marginRight: '5px' }}></i>;
      case 'info':
        return <i className="fas fa-info-circle" style={{ marginRight: '5px' }}></i>;
      case 'error':
        return <i className="fas fa-times-circle" style={{ marginRight: '5px' }}></i>;
      default:
        return null;
    }
  };

  return (
    <div className={`toast ${type}`} style={{ ...getPositionStyle(), display: visible ? 'block' : 'none', position: 'fixed' }}>
      <div className="toast-content">
        {getIcon()}
        <div className="toast-title">{title}</div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  duration: PropTypes.number.isRequired,
};
Toast.defaultProps = {
  position: 'top-right',
  duration: 5000, // 5 seconds
};
export default Toast;
