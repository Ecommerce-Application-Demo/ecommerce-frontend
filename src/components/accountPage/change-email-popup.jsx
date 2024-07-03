import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import Popup from '../../small-components/Popup';
import LoadingScreen from '../../small-components/Loading-screen';
import { resetAuthGenerateOtp } from '../../redux/Slices/otpSlice';
import ChangeEmailModal from './change-email-modal';
import otpAsyncThunk from '../../api/asyncThunk/otpAsyncThunk';
import { authenticateErrorHandler } from '../../api/utilities/helper';
import { useNavigate } from 'react-router-dom';

const ChangeEmailPopup = (props) => {
    const {
        email,
        openEmailPopup,
        setOpenEmailPopup,
        setOpenEmailModal,
        closePage,
    } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const generateOtp = useSelector(state => state.otp.authGenerateOtpData);

    const [selectEmail, setSelectEmail] = useState(false);

    const onClosePopup = () => {
      setOpenEmailPopup(false);
      closePage();
    };

    // useEffect(() => {
    //     if (generateOtp.SUCCESS) {
    //         onClosePopup();
    //     }
    // }, [generateOtp.SUCCESS]);

    useEffect(() => {
        dispatch(resetAuthGenerateOtp());
    }, []);

    const handleRequestOtp = () => {
        const dataToRequestOtp = {
          input: email
        }
        dispatch(otpAsyncThunk.authGenerateOtp(dataToRequestOtp)).unwrap()
        .then(()=>{
            toast.success('otp send successfully.')
            setOpenEmailPopup(false);
            setOpenEmailModal(true);
        })
        .catch((error) => {
          if (error?.name === 'CustomError') {
            navigate('/login-signup')
            authenticateErrorHandler(dispatch, error);
          }
          else {
            toast.error('Error in sending OTP.');
          }
        });
    };



    return (
            <Popup
                onClose={onClosePopup}
                title={<h2>2-Step Verification Required</h2>}
                titleClassName='change-email-popup-title'
            >
                {generateOtp.START && <LoadingScreen />}
                <div className='change-email-popup-container'>
                    <p>For better security, OTP is sent to a previously used number on your account.</p>
                    <h3>Select Your Email.</h3>
                    <label htmlFor='selectEmail' className='change-email-radio-wrapper' onClick={() => setSelectEmail(true)}>
                        <input type='radio' id='selectEmail' checked={selectEmail} readOnly />
                        <p>{email}</p>
                    </label>
                    <div className='request-otp-btn' onClick={handleRequestOtp} disabled={!selectEmail}>
                        REQUEST OTP
                    </div>
                </div>
            </Popup>
    );
};

export default ChangeEmailPopup;
