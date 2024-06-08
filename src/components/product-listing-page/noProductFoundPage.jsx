import React from 'react'
import noProductImage from '../../assets/pictures/noProductFound.png';
const NoProductFoundPage = () => {
  return (
    <div className='noProductFound-main-container'>
        <div className='noProductFound-imagewrapper'>
          <img src={noProductImage} alt='no product image' />
        </div>
        <div className='noProductFound-content-wrapper'>
          <h3 className='noProduct-title'>Oops! We Couldn't Find What You're Looking For</h3>
          <p>It seems we don't have any products matching your search. But don't worry, we've got plenty of other amazing items just for you!</p>
        </div>
    </div>
  )
}

export default NoProductFoundPage;
