import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CrossSymbol } from '../assets/icons';
import classNames from 'classnames';

const Modal = ({ onClose, children, height, width, widthForMobile, widthForTab, title }) => {
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
    // Add event listener to close modal on click outside
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = ''; // Re-enable scrolling when modal is closed
    };
  }, []);

  const screenWidth_mobile = dimensions.width < 480;
  const screenWidth_tab = dimensions.width < 768 && dimensions.width > 480;
  
//   const screenHeight_mobile = dimensions.height < 480;
//   const screenHeight_tab = dimensions.he < 768 && dimensions.width > 480;


 const handleWidth = () => {
  if (screenWidth_mobile) {
    return widthForMobile || widthForTab || width;
  } else if (screenWidth_tab) {
    return widthForTab || width;
  } else {
    return width;
  } 
};

// const handleHeight = () => {
//     if (height && height) {
//       return widthForMobile || widthForTab || width;
//     } else if (screenWidth_tab) {
//       return widthForTab || width;
//     } else {
//       return width;
//     } 
//   };


  const divStyle = {
    height: height,  
    width: handleWidth(),
    overflow: 'auto',
  };

  const titleStyle = classNames({
    'modal-title-container':true,
    'modal-title-container-title-present': title,
  })

  return (
    <div style={divStyle} className='modal-container' ref={containerRef}>
        <div className={titleStyle}>
            <p>{title}</p>
      <div className='close-button' onClick={onClose}>
       <CrossSymbol/>
      </div>

        </div>
      {children}
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  heightForTab: PropTypes.string,
  heightForMobile:PropTypes.string,
  width:PropTypes.string.isRequired,
  widthForMobile:PropTypes.string,
  widthForTab:PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Modal;



//steps to use this modal-global

// const [isModalOpen, setIsModalOpen] = useState(true);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <div>
//       <button onClick={handleOpenModal}>Open Modal</button>
//       {isModalOpen && (
//         <Modal onClose={handleCloseModal} width='500px' widthForTab='400px' widthForMobile='100px' title='edit address' height='600px'>
//           Your custom content goes here 
//           <h2>Hello, this is my modal content!</h2>
//           <p>Feel free to add any React components or HTML content.</p>
//           <div style={{textAlign:'center'}}>hii all</div>
//           <Login/>
//         </Modal>
//        )}
//     </div>
//   );
// }