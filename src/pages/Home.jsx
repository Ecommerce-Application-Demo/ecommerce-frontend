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

  return (
   <div className='home'>
    {tags.HomeTag()}
   {isLoggedIn ?
    <h1 style={{textAlign:'center', verticalAlign:'middle',marginTop:'100px'}}>Wecome {loggedInUserName}</h1>
    :
    <Link to='/login-signup' style={{textAlign:'center', verticalAlign:'middle',marginTop:'100px',textDecoration:'none'}}><h1 >KINDLY LOGIN</h1></Link>
   }
   <Link to='/product'>
   <button>View product</button>
   </Link>
   </div>
  )
}

export default Home