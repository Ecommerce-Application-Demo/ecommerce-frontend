import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found-container'>
            <div className='not-found-roadmap'>
                <p style={{color:'grey'}}>Home</p>
                <p style={{color:'grey'}}>/</p>
                <p>404 Error</p>
            </div>
            <div className='not-found-main-text'>
                <p className='text-404'>404 Not Found</p>
                <p>Your visited page not found. You may go home page.</p>
                <Link to='/'><button className='backBtn'>Back To Home Page</button></Link>
            </div>
    </div>
  )
}

export default NotFound;