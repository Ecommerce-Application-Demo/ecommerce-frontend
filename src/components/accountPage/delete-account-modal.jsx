import React, { useState } from 'react'
import Modal from '../../small-components/Modal-global';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import userApi from '../../api/asyncThunk/userApi';
import { toast } from 'react-toastify';
import { resetProfileDetails } from '../../redux/Slices/profileSlice';
import { resetUserDetails } from '../../redux/Slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { authenticateErrorHandler } from '../../api/utilities/helper';

const DeleteAccountModal = (props) => {
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        clickDeleteAccount,
        setClickDeleteAccount,
    } = props;

    const [inputValue, setInputValue] = useState('');

    console.log(user);
    const onClose = () => {
        setClickDeleteAccount(false);
    }

    const handleDeleteAccount =() => {
        dispatch(userApi.deleteAccount()).unwrap()
        .then(()=>{
            toast.success('account delete successfully.')
            dispatch(resetProfileDetails());
            dispatch(resetUserDetails());
            navigate('/');
        })
        .catch((error)=>{
            authenticateErrorHandler(dispatch, error);
        })
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
        <div className={confirmBtnStyle} disabled={inputValue !== user?.loggedInEmail} onClick={handleDeleteAccount}>
            Confirm Delete
        </div>
    </Modal>
  )
}

export default DeleteAccountModal;