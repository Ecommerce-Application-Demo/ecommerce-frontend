import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import tags from '../metaTag/dynamicTags';
const Home = () => {
    const user =useSelector((state)=>state.user)
    const {
      isLoggedIn,
      loggedInUserName,
    } = user;

const pattern = /(hiran|kaustab|hillol|bristi)/i;

 const loggedinName = pattern.test(loggedInUserName);

  return (
   <div className='home'>
    {tags.homeTag()}
   {isLoggedIn ?
    loggedinName ?  
      <h1 style={{textAlign:'center', verticalAlign:'middle',marginTop:'100px'}}>Surprise Motherfucker {loggedInUserName}</h1>
      :
    <h1 style={{textAlign:'center', verticalAlign:'middle',marginTop:'100px'}}>Wecome {loggedInUserName}</h1>
   
    :
    <Link to='/login-signup' style={{textAlign:'center', verticalAlign:'middle',marginTop:'100px',textDecoration:'none'}}><h1 >KINDLY LOGIN</h1></Link>
   }
   </div>
  )
}

export default Home