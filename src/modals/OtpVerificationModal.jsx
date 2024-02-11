import React from 'react'
import Modal from '../small-components/Modal-global';
import Otp from '../components/Otp';
const OtpVerificationModal = (props) => {
    const {
        clickForgotPassword,
        setClickForgotPassword,
    } = props;

    console.log('otp modal');

    const onClose =()=>{
        setClickForgotPassword(false);
    }
  return (
    <Modal 
    width="500px"
    // title="Otp Verification"
    onClose={onClose}
    height="400px"
    >
        <div style={{display:'flex',alignItems:'center',justifyContent:'center', marginTop:'30px'}}>
        <Otp />
        </div>
    </Modal>
  )
}

export default OtpVerificationModal