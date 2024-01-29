import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
const Home = () => {
    const user =useSelector((state)=>state.user)
    const {
      isLoggedIn,
      loggedInUserName,
    } = user;

    useEffect(()=>{

    },[isLoggedIn]);
    const dispatch = useDispatch()
  return (
   <div className='home'>hi
   {isLoggedIn ?
    <h1 style={{textAlign:'center', verticalAlign:'middle',marginTop:'100px'}}>Wecome {loggedInUserName}</h1>
    :
    <Link to='/login-signup' style={{textAlign:'center', verticalAlign:'middle',marginTop:'100px',textDecoration:'none'}}><h1 >KINDLY LOGIN</h1></Link>
   }
   </div>
  )
}

export default Home