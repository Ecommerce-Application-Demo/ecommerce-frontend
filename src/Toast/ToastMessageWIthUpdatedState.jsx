import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ToastMessageWIthUpdatedState = () => {
  const msg = useSelector(state => state.user.msg);
  return msg; 
};

export const ToastErrorWithUpdatedState = () => {
  const error = useSelector(state =>state.user.error);
  return error;
}

export const ToastTypeWithUpdatedState = () => {
  const existEmail = useSelector(state =>state.user.existEmail);
  let type;
  if(existEmail){
    type = 'success'
  }else {
    type = 'warning'
  }
 return type;
}


export default ToastMessageWIthUpdatedState;
