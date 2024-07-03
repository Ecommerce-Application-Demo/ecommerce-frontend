import React, { useState } from 'react'
import ChangeEmailPopup from './change-email-popup';
import ChangeEmailModal from './change-email-modal';

const ChangeEmailPage = (props) => {
    const {
        dispatch,
        email,
        openChangeEmailPage,
        setOpenChangeEmailPage,
    } = props;

    const [openEmailPopup, setOpenEmailPopup] = useState(true);
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const closePage = () => {
        setOpenChangeEmailPage(false);
    }
  return (
    <>
    {openEmailPopup &&
    <ChangeEmailPopup
        dispatch = { dispatch }
        email = { email }
        openEmailPopup={ openEmailPopup }
        setOpenEmailPopup={ setOpenEmailPopup }
        openEmailModal = { openEmailModal }
        setOpenEmailModal = { setOpenEmailModal }
        closePage = { closePage }
    />}
    {openEmailModal && <ChangeEmailModal
         dispatch = { dispatch }
         email = { email }
         setOpenEmailPopup={ setOpenEmailPopup }
         openEmailModal = { openEmailModal }
         setOpenEmailModal = { setOpenEmailModal }
         closePage = { closePage }
    />}
    </>
  )
}

export default ChangeEmailPage;