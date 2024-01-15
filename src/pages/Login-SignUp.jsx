import React from 'react'
import loginPicture from '../assets/pictures/dl.beatsnoop 1.png';
import SignUp from '../components/SignUp';
import { useParams,useLocation } from 'react-router-dom';
import Login from '../components/Login';
import LoginOrSignUp from '../components/LoginOrSignUp';
const LoginSignUp = () => {
    const routeParams=useLocation().pathname;
    console.log(routeParams);
  return (
  <div className='login-signup-container'>
  <img src={loginPicture} alt='login/signup' className='login-signup-image'/>
  {routeParams==='/login-signup' && <LoginOrSignUp/>}
  {routeParams=='/signup'&& <SignUp/>}
  {routeParams=='/login'&& <Login/>}
  </div>
  )
}

export default LoginSignUp;