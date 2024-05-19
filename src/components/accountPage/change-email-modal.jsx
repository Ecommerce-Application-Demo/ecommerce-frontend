import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../small-components/Modal-global';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { SiTicktick } from "react-icons/si";
import { motion } from 'framer-motion';
import useBreakpoints from '../../api/utilities/responsive';
import { oldOtpCardVariants, newEmailCardVariants, newOtpCardVariants } from '../../uiHelper/change-email-transitions';
import otpAsyncThunk from '../../api/asyncThunk/otpAsyncThunk';
import userApi from '../../api/asyncThunk/userApi';
import profileThunk from '../../api/asyncThunk/profileAsyncThnuk';
import { resetProfileDetails } from '../../redux/Slices/profileSlice';
import { resetUserDetails } from '../../redux/Slices/userSlice';
import { addNewPreviousLogin, authenticateErrorHandler } from '../../api/utilities/helper';

const ChangeEmailModal = (props) => {
  const { dispatch, email, setOpenEmailModal, closePage } = props;
  const { isMobile, isDesktopOrLaptop } = useBreakpoints();
  
  // Refs and state for OTP inputs
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [newEmailInput, setNewEmailInput] = useState('');
  const newOtpRefs = [useRef(), useRef(), useRef(), useRef()];
  const [newOtp, setNewOtp] = useState(Array(4).fill(''));
  const [completeStep1, setCompleteStep1] = useState(false);
  const [completeStep2, setCompleteStep2] = useState(false);

  const handleInputChange = (otpType, index, e) => {
    const value = e.target.value;
    const updatedOtp = otpType === 'current' ? [...otp] : [...newOtp];
    updatedOtp[index] = value.slice(0, 1); // Limit the value to the first character

    if (value.length === 1 && index < inputRefs.length - 1) {
      (otpType === 'current' ? inputRefs : newOtpRefs)[index + 1].current.focus();
    }

    if (otpType === 'current') {
      setOtp(updatedOtp);
    } else {
      setNewOtp(updatedOtp);
    }
  };

  const handleKeyDown = (otpType, index, e) => {
    const value = e.target.value;
    if (e.key === 'Backspace' && index > 0 && value.length === 0) {
      (otpType === 'current' ? inputRefs : newOtpRefs)[index - 1].current.focus();
    }
  };

  const getFullOtp = (otpType) => {
    return (otpType === 'current' ? otp : newOtp).join('');
  };

  useEffect(() => {
    const fullOtp = getFullOtp('current');
    if (fullOtp.length === 4) {
      let dataForDispatch = {
        email: email,
        otp: fullOtp,
      };
      dispatch(otpAsyncThunk.authValidateOtp(dataForDispatch)).unwrap()
        .then((res) => {
          setCompleteStep1(true);
          setOtp(Array(4).fill(''));
          console.log(res);
        })
    }
  }, [otp, dispatch, email]);

  const sendOtpAgain = () => {
    let dataForDispatch = {
      input: email,
    };
    // dispatch(generateOtp(dataForDispatch))
    //   .unwrap()
    //   .then(() => {
    //     toast.success('OTP sent successfully');
    //   })
    //   .catch(() => {
    //     toast.error('An error occurred during OTP send');
    //   });
  };

  const handleNewEmail = () => {
    const dataToCheckEmail = {
      input: newEmailInput,
    };
    dispatch(userApi.isEmailExist(dataToCheckEmail)).unwrap()
    .then((res)=>{
      console.log(res);
      if(!res) {
        dispatch(otpAsyncThunk.authGenerateOtp(dataToCheckEmail)).unwrap()
        .then(()=>{
          setCompleteStep2(true);
        })
      } else {
        toast.error('email is already in use.')
      }
    })
  };

  const handleChangeEmail =()=> {
    const fullNewOtp = getFullOtp('new');
    if (fullNewOtp.length === 4) {
      let dataForValidOtp = {
        email: newEmailInput,
        otp: fullNewOtp,
      };
      dispatch(otpAsyncThunk.authValidateOtp(dataForValidOtp)).unwrap()
        .then((res) => {
          const dataForChangeEmail = {
            newEmail: newEmailInput,
          }
          dispatch(profileThunk.changeEmail(newEmailInput)).unwrap()
          .then(()=>{
            toast.success('email change successfully. please login again.');
            addNewPreviousLogin(newEmailInput);
            dispatch(resetProfileDetails());
            dispatch(resetUserDetails());
          }).catch((error)=>{
            if (error?.errorCode===122) {
              toast.info('your session is expired, try to login again.')
            } else {
              toast.error('some error occured.');
            }
            authenticateErrorHandler(dispatch, error);
          })
        }).catch((error) => {
          toast.error('invalid otp.')
        });
    }
  }

  const onClose = () => {
    setOpenEmailModal(false);
    closePage();
  };

  // Style classes
  const step1StyleOverlay = classNames('old-otp-card-overlay', {
    'old-otp-card-overlay--success': completeStep1
  });

  const step3StyleOverlay = classNames('old-otp-card-overlay', {
    'old-otp-card-overlay--disabled': !completeStep1 || !completeStep2,
  });

  const newEmailCardOverlayStyle = classNames('new-email-card-overlay', {
    'new-email-card-overlay--disabled': !completeStep1,
    'new-email-card-overlay--success': completeStep2 && completeStep1,
  });

  return (
    <Modal
      height="fit-content"
      width="80vw"
      heightForTab="max-content"
      widthForTab="100vw"
      heightForMobile="90vh"
      widthForMobile="100vw"
      onClose={onClose}
      title="Follow the steps to change email."
    >
      <div className="change-email-modal-container">
        {/* Old email OTP verification */}
        <motion.div
          className="old-otp-card"
          animate={isMobile ? oldOtpCardVariants(completeStep1).mobile : isDesktopOrLaptop ? oldOtpCardVariants(completeStep1).desktop : oldOtpCardVariants(completeStep1).tablet}
          transition={{ duration: 0.5 }}
        >
          {completeStep1 && (
            <div
              className={step1StyleOverlay}
              onClick={() => { setCompleteStep1(false); setCompleteStep2(false); }}
            >
              <SiTicktick />
              Completed.
            </div>
          )}
          <h2>Verify with OTP</h2>
          <p>Sent to {email}</p>
          <div className="otp-input-wrapper">
            {inputRefs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type="number"
                readOnly={completeStep1}
                autoFocus={index === 0}
                onChange={(e) => handleInputChange('current', index, e)}
                onKeyDown={(e) => handleKeyDown('current', index, e)}
                value={otp && otp[index]}
                className="otp-input"
              />
            ))}
          </div>
          <p className="resend-otp-text" onClick={sendOtpAgain}>
            Resend OTP
          </p>
        </motion.div>
        {/* New email input */}
        <motion.div
          className="new-email-card"
          animate={isMobile ? newEmailCardVariants(completeStep1, completeStep2).mobile : isDesktopOrLaptop ? newEmailCardVariants(completeStep1, completeStep2).desktop : newEmailCardVariants(completeStep1, completeStep2).tablet}
          transition={{ duration: 0.5 }}
        >
          {(!completeStep1 || completeStep2) && (
            <div
              className={newEmailCardOverlayStyle}
              onClick={() => setCompleteStep2(false)}
            >
              {completeStep1 && completeStep2 ? (
                <>
                  <SiTicktick />
                  Completed.
                </>
              ) : null}
            </div>
          )}
          <h2>Enter new Email here.</h2>
          <input
            placeholder="Enter new email"
            value={newEmailInput}
            onChange={(e) => setNewEmailInput(e.target.value)}
          />
          <div className="request-otp-btn" onClick={handleNewEmail} disabled={!emailRegex.test(newEmailInput) || (newEmailInput === email)}>
            REQUEST OTP
          </div>
        </motion.div>
        {/* New email OTP verification */}
        <motion.div
          className="old-otp-card"
          animate={isMobile ? newOtpCardVariants(completeStep1, completeStep2).mobile : isDesktopOrLaptop ? newOtpCardVariants(completeStep1, completeStep2).desktop : newOtpCardVariants(completeStep1, completeStep2).tablet}
          transition={{ duration: 0.5 }}
        >
          {(!completeStep1 || !completeStep2) && (
            <div className={step3StyleOverlay}></div>
          )}
          <h2>Verify with OTP</h2>
          <p>Sent to {newEmailInput}</p>
          <div className="otp-input-wrapper">
            {newOtpRefs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type="number"
                readOnly={!completeStep1 && !completeStep2}
                autoFocus={index === 0}
                onChange={(e) => handleInputChange('new', index, e)}
                onKeyDown={(e) => handleKeyDown('new', index, e)}
                value={newOtp && newOtp[index]}
                className="otp-input"
              />
            ))}
          </div>
          <p className="resend-otp-text" onClick={sendOtpAgain}>
            Resend OTP
          </p>
          <div className='change-email-btn' onClick={handleChangeEmail}>
            CHANGE EMAIL
          </div>
        </motion.div>
      </div>
    </Modal>
  );
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

// const validationSchema = Yup.object({
//   email: Yup.string().required('email is required').matches(emailRegex, 'Enter a valid email address'),
// });

export default ChangeEmailModal;
