import React, { useState } from 'react'
import DeleteAccountModal from './delete-account-modal';
import { useDispatch } from 'react-redux';
import userApi from '../../api/asyncThunk/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccountManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {logoutAllDevice} = userApi;
    const [clickDeleteAccount, setClickDeleteAccount] = useState(false);

    const handleLogoutAllDevice =()=> {
      dispatch(logoutAllDevice()).unwrap()
      .then(()=> {
        toast.success('logout from all device sucessfull. you have to login again');
        navigate('/login-signup');
      }).catch((error)=>{
        toast.error(error);
      })
    }
  return (
    <div className="logout-or-delete-account-container">
    {clickDeleteAccount && 
    <DeleteAccountModal 
    setClickDeleteAccount= { setClickDeleteAccount }
    clickDeleteAccount = { clickDeleteAccount }
    />
    }
    <h3>Account Management</h3>
    <div className="delete-account-btn" onClick={()=>{setClickDeleteAccount(true)}}>
      Delete Account
    </div>
    <div className="logoutAll-account-btn" onClick={handleLogoutAllDevice}>
     Log Out For All Device
    </div>
</div>
  )
}

export default AccountManagement;