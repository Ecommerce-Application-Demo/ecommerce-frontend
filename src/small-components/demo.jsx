import React from 'react'
import ScrollToTopButton from './scrollToTop';

const Demo = () => {
  return (
    <div>
      <div style={{width: '100%', height:'500px', background:'blue'}}></div>
      <div style={{width: '100%', height:'500px', background:'red'}}></div>
      <div style={{width: '100%', height:'500px', background:'grey'}}></div>
    <ScrollToTopButton />
    </div>
  )
}

export default Demo;
