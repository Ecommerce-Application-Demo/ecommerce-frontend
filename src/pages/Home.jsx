import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmailExist } from '../api/userApi';
const Home = () => {
    const data =useSelector((state)=>{
      return state.user;
    })
    const dispatch = useDispatch()
    console.log(`data is coming from home page ${data.existEmail}`);
  return (
   <div className='home'>hi
   <button onClick={()=>{dispatch(isEmailExist('hii'))}}>click me</button>
   </div>
  )
}

export default Home