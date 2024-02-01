import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import tags from '../metaTag/dynamicTags';
import { DesiCartIcon } from '../assets/icons';
import LoadingScreen from '../small-components/Loading-screen';
const Home = () => {
    const user =useSelector((state)=>state.user)
    const {
      isLoggedIn,
      loggedInUserName,
    } = user;
  
  return (
   <div className='home'>
    {tags.homeTag()}
    {/* <DesiCartIcon/> */}
    {/* <LoadingScreen/> */}
   {isLoggedIn ?
    <h1 style={{textAlign:'center', verticalAlign:'middle',marginTop:'100px'}}>Wecome {loggedInUserName}</h1>
    :
    <Link to='/login-signup' style={{textAlign:'center', verticalAlign:'middle',marginTop:'100px',textDecoration:'none'}}><h1 >KINDLY LOGIN</h1></Link>
   }
   </div>
  )
}

export default Home