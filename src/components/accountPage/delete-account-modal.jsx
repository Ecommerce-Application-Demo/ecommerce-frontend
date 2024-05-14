import React, { useState } from 'react'
import Modal from '../../small-components/Modal-global';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const DeleteAccountModal = (props) => {
    const user = useSelector(state=>state.user);
    const {
        clickDeleteAccount,
        setClickDeleteAccount,
    } = props;

    const [inputValue, setInputValue] = useState('');


    console.log(user);
    const onClose = () => {
        setClickDeleteAccount(false);
    }
    const confirmBtnStyle = classNames({
        'confirm-delete-btn': inputValue === user?.loggedInEmail,
        'confirm-delete-btn-disabled' : inputValue !== user?.loggedInEmail,
    })
  return (
    <Modal
    height='fit-content'
    width='fit-content'
    onClose={onClose}
    title='Are you sure?'
    >
        <p className='confirm-delete-content'>Type {user?.loggedInEmail|| 'your email'} to enable confirm delete button.</p>
        <input className='confirm-delete-input' value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}}/>
        <div className={confirmBtnStyle} disabled={inputValue !== user?.loggedInEmail}>
            Confirm Delete
        </div>
    </Modal>
  )
}

export default DeleteAccountModal;