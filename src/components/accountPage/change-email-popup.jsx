import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import Popup from '../../small-components/Popup';
import LoadingScreen from '../../small-components/Loading-screen';
import ViewAddress from '../address/view-address';
import { resetAuthGenerateOtp } from '../../redux/Slices/otpSlice';
import ChangeEmailModal from './change-email-modal';

const ChangeEmailPopup = (props) => {
    const {
        email,
        openEmailPopup,
        setOpenEmailPopup,
        setOpenEmailModal,
        closePage,
    } = props;
    const dispatch = useDispatch();
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
        if (!selectEmail) {
            toast.error('Please select an email.');
            return;
        }
        // const dataToRequestOtp = {
        //   input: email
        // }
        // dispatch(otpAsyncThunk.authGenerateOtp(dataToRequestOtp)).unwrap()
        // .catch((error) => {
        //   authenticateErrorHandler(dispatch, error);
        //   if (error?.errorCode === 122) {
        //     toast.info('Your session has expired. Please login again.');
        //   } else {
        //     toast.error('Error in sending OTP.');
        //   }
        // });
        setOpenEmailPopup(false);
        setOpenEmailModal(true);
    };



    return (
            <Popup
                onClose={onClosePopup}
                title={<h2>2-Step Verification Required</h2>}
                titleClassName='change-email-popup-title'
            >
                {generateOtp.START && <LoadingScreen />}
                {/* {generateOtp.FAIL && !generateOtp.START && toast.error('Error in sending OTP.')} */}
                {generateOtp.SUCCESS && <ViewAddress />}
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
