import React from 'react'
import { PiSmileyWinkFill } from "react-icons/pi";

const DashboardPage = () => {
  return (
    <div className='global-margin'>
        <div className='dashboard-main-container'>
        <div className='dashboard-top-background'></div>
        <div className='dashboard-user-icon-wrapper'>
            <div>
        <PiSmileyWinkFill className='dashboard-user-icon'/>
            </div>
        </div>
        <p className='dashboard-user-email'>kinghukr713@gmail.com</p>
        </div>
    </div>
  )
}

export default DashboardPage;