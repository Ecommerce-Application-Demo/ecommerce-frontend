import React from 'react'

const ProductListingBreadcrump = (props) => {
  const { 
      breadCrumpList,
      loading,
      totalProduct
     } = props;

     const totalProductText = () => {
      return `(${totalProduct})`;
     }
  return (
    !loading ? 
    <div className='product-list-breadcrump-container'>
      <p className='home-breadcrump'>Home</p>  
      {breadCrumpList?.map((breadCrump, index)=> {
        return (
          <div key={index} className='product-list-breadcrump-wrapper'>
            <p>/</p>
            <p>{breadCrump?.name}</p>
          </div>
        )
      })}
      <p className='totalProduct-breadcrump'>({totalProduct})</p>
    </div>
    :
<div className='product-list-breadcrump-container'>
      <p className='home-breadcrump-loading'></p>  
      <p className='home-breadcrump-loading'></p>  
      <p className='totalProduct-breadcrump-loading'>{totalProductText}</p>
    </div>  )
}

export default ProductListingBreadcrump;