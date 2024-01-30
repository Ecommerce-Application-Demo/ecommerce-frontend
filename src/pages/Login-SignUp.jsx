import React, { useRef,useEffect } from 'react'
import loginPicture from '../assets/pictures/dl.beatsnoop 1.png';
import SignUp from '../components/SignUp';
import {useLocation } from 'react-router-dom';
import Login from '../components/Login';
import LoginOrSignUp from '../components/LoginOrSignUp';
import Otp from '../components/Otp';
const LoginSignUp = () => {
    const routeParams=useLocation().pathname;
    console.log(routeParams);
    const signUpRef=useRef(null);
    const loginSignUpRef=useRef(null);
    const location=useLocation();

    useEffect(() => {
      // Check the current route and scroll to the corresponding component
      if (location.pathname === '/login-signup') {
        scrollToComponent(loginSignUpRef);
      } else if (location.pathname === '/signup') {
        scrollToComponent(signUpRef);
      }
      // } else if (location.pathname === '/component3') {
      //   scrollToComponent(component3Ref);
      // }
    }, [location.pathname]);

    const scrollToComponent = (ref, path) => {
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
  
        // // Update the route
        // if (location.pathname !== path) {
        //   window.history.pushState({}, null, path);
        // }
      }
    };
  return (
  <div className='login-signup-container'>
  <img src={loginPicture} alt='login/signup' className='login-signup-image'/>
  <div className='loginSIgnup-component-container'>
    {routeParams==='/login-signup' && <LoginOrSignUp/>}
    {routeParams==='/otp-verification' && <Otp/>}
    {routeParams==='/signup' && <SignUp/>}
    {routeParams==='/login' && <Login/>}
  </div>
  </div>
  )
}

export default LoginSignUp;

