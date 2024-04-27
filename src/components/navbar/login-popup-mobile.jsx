import React from 'react'
import Popup from '../../small-components/Popup';
import LoginOrSignUp from '../LoginOrSignUp';

const LoginPopupMobile = (props) => {
    const {
        setOpenLoginPopup,
    } = props;

    const onClosePopup = () => {
        setOpenLoginPopup(false);
      }
  return (
    <Popup onClose={onClosePopup}>
        <div style={{marginBottom:'20px'}}>
        <div className="login-image-container"></div>
        <LoginOrSignUp/>
        </div>
    </Popup>
  )
}

export default LoginPopupMobile;