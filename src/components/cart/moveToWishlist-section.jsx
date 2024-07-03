import React from 'react'
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const MoveToWishlist = () => {
  return (
    <div className='moreWishlist-container'>
      <div>
      <MdOutlineBookmarkAdd size={20}/>
      <p>Add More From Wishlist</p>
      </div>
      <MdKeyboardArrowRight size={20}/>
    </div>
  )
}

export default MoveToWishlist;
