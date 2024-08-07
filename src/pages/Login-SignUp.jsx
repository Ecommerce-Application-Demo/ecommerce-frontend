import React, { useRef,useEffect } from 'react'
import loginPicture from '../assets/pictures/dl.beatsnoop 1.png';
import SignUp from '../components/SignUp';
import {useLocation } from 'react-router-dom';
import Login from '../components/Login';
import LoginOrSignUp from '../components/LoginOrSignUp';
import Otp from '../components/Otp';
import { useDispatch, useSelector } from 'react-redux';

const LoginSignUp = () => {
    const refrerLink = useSelector((state)=>state.theme.refrerLink);
    const routeParams=useLocation().pathname;
    const dispatch = useDispatch();
    const signUpRef=useRef(null);
    const loginSignUpRef=useRef(null);
    const location=useLocation();

    useEffect(() => {
      if (location.pathname === '/login-signup') {
        scrollToComponent(loginSignUpRef);
      } else if (location.pathname === '/signup') {
        scrollToComponent(signUpRef);
      }
    }, [location.pathname]);

    const scrollToComponent = (ref, path) => {
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    console.log(window.location, 'url');
  return (
    <div className='global-margin'>
  <div className='login-signup-container'>
  <div className='loginSIgnup-component-container'>
    {routeParams===`/login-signup` && <LoginOrSignUp/>}
    {routeParams==='/otp-verification' && <Otp/>}
    {routeParams==='/signup' && <SignUp/>}
    {routeParams==='/login' && <Login/>}
  </div>
  </div>
    </div>
  )
}

export default LoginSignUp;

